import React, { useState } from 'react';
import { User } from '../types';
import { UserCircle2, Users } from 'lucide-react';

interface LoginFormProps {
  onConnect: (userData: Omit<User, 'connected'>) => void;
  isConnecting: boolean;
}

export default function LoginForm({ onConnect, isConnecting }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [maxChats, setMaxChats] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConnect({ username, maxChats });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Chat Agent Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <div className="relative">
              <UserCircle2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your username"
                required
                disabled={isConnecting}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Simultaneous Chats
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="number"
                min="1"
                max="10"
                value={maxChats}
                onChange={(e) => setMaxChats(parseInt(e.target.value))}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                disabled={isConnecting}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isConnecting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : 'Connect'}
          </button>
        </form>
      </div>
    </div>
  );
}