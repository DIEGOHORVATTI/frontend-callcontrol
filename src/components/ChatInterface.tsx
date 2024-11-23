import React, { useState } from 'react';
import { Chat, User } from '../types';
import { LogOut, MessageSquare, Clock } from 'lucide-react';
import { formatDuration } from '../utils/formatDuration';

interface ChatInterfaceProps {
  user: User;
  chats: Chat[];
  onDisconnect: () => void;
  onEndChat: (chatId: string) => void;
}

export default function ChatInterface({ user, chats, onDisconnect, onEndChat }: ChatInterfaceProps) {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const activeChat = chats.find(chat => chat.id === selectedChat);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <MessageSquare className="text-blue-600" size={24} />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Welcome, {user.username}</h1>
              <p className="text-sm text-gray-500">
                Active Chats: {chats.filter(c => c.status === 'active').length} / {user.maxChats}
              </p>
            </div>
          </div>
          <button
            onClick={onDisconnect}
            className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-200"
          >
            <div className="flex items-center space-x-2">
              <LogOut size={18} />
              <span>Disconnect</span>
            </div>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat List */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Chats</h2>
              </div>
              <div className="divide-y divide-gray-200">
                {chats.map(chat => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition duration-200 ${
                      selectedChat === chat.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">
                          {chat.caller || `Chat #${chat.id}`}
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>{formatDuration(chat.duration)}</span>
                        </div>
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          chat.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {chat.status === 'active' ? 'Active' : 'Ended'}
                      </span>
                    </div>
                  </button>
                ))}
                {chats.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    Waiting for new chats...
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Chat Details */}
          <div className="md:col-span-2">
            {activeChat ? (
              <div className="bg-white rounded-lg shadow">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      {activeChat.caller || `Chat #${activeChat.id}`}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Duration: {formatDuration(activeChat.duration)}
                    </p>
                  </div>
                  {activeChat.status === 'active' && (
                    <button
                      onClick={() => onEndChat(activeChat.id)}
                      className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition duration-200"
                    >
                      End Chat
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Service</p>
                      <p className="mt-1">{activeChat.service}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Media Type</p>
                      <p className="mt-1">{activeChat.media}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                Select a chat to view details
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}