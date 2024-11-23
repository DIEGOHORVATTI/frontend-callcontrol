import React, { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import LoginForm from './components/LoginForm';
import ChatInterface from './components/ChatInterface';
import { Chat, User, ServerError } from './types';
import { toast, Toaster } from 'react-hot-toast';

// Initialize socket with proper configuration
const socket = io("http://dev.digitro.com", {
  reconnectionDelayMax: 10000,
  path: "/callcontrol"
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = useCallback(({ username, maxChats }: Omit<User, 'connected'>) => {
    setIsConnecting(true);
    socket.emit('USER_CONNECT', { username, maxCalls: maxChats });
  }, []);

  const handleDisconnect = useCallback(() => {
    if (user?.username) {
      socket.emit('USER_DISCONNECT', { username: user.username });
    }
  }, [user?.username]);

  const handleEndChat = useCallback((chatId: string) => {
    socket.emit('END_CALL', { callId: chatId });
  }, []);

  useEffect(() => {
    socket.on('connect_error', () => {
      setIsConnecting(false);
      toast.error('Failed to connect to server');
    });

    socket.on('USER_CONNECTED', (data: { username: string; maxCalls: number }) => {
      setIsConnecting(false);
      setUser({ username: data.username, maxChats: data.maxCalls, connected: true });
      toast.success('Connected successfully');
    });

    socket.on('USER_CONNECTION_ERROR', (data: ServerError) => {
      setIsConnecting(false);
      toast.error(data.error || 'Connection failed');
    });

    socket.on('USER_DISCONNECTED', () => {
      setUser(null);
      setChats([]);
      toast.success('Disconnected successfully');
    });

    socket.on('USER_DISCONNECTION_ERROR', (data: ServerError) => {
      toast.error(data.error);
    });

    socket.on('NEW_CALL', (data: { 
      callId: string;
      media: string;
      startDate: string;
      service: string;
      caller: string;
    }) => {
      const newChat: Chat = {
        id: data.callId,
        startTime: new Date(data.startDate),
        duration: 0,
        status: 'active',
        service: data.service,
        caller: data.caller,
        media: data.media
      };
      
      setChats(prev => [...prev, newChat]);
      socket.emit('NEW_CALL_ANSWERED', { callId: data.callId });
    });

    socket.on('CALL_ENDED', (data: { callId: string }) => {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === data.callId ? { ...chat, status: 'ended' } : chat
        )
      );
    });

    socket.on('END_CALL_ERROR', (data: { callId: string; error: string }) => {
      toast.error(`Failed to end chat: ${data.error}`);
    });

    return () => {
      socket.off('connect_error');
      socket.off('USER_CONNECTED');
      socket.off('USER_CONNECTION_ERROR');
      socket.off('USER_DISCONNECTED');
      socket.off('USER_DISCONNECTION_ERROR');
      socket.off('NEW_CALL');
      socket.off('CALL_ENDED');
      socket.off('END_CALL_ERROR');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setChats(prevChats =>
        prevChats.map(chat => ({
          ...chat,
          duration: Math.floor((new Date().getTime() - new Date(chat.startTime).getTime()) / 1000)
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      {!user ? (
        <LoginForm onConnect={handleConnect} isConnecting={isConnecting} />
      ) : (
        <ChatInterface
          user={user}
          chats={chats}
          onDisconnect={handleDisconnect}
          onEndChat={handleEndChat}
        />
      )}
    </>
  );
}

export default App;