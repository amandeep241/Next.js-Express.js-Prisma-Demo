'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { webhook, setAuthToken } from '@/services/api';
import WebhookForm from '@/components/dashboard/WebhookForm';
import MessageList from '@/components/dashboard/MessageList';
import { Message } from '@/types/message';
import toast from 'react-hot-toast';

const WEBSOCKET_URL = process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:3000';

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMessages = async () => {
    if (!token) return;
    
    try {
      setAuthToken(token);
      const fetchedMessages = await webhook.getMessages();
      setMessages(fetchedMessages);
    } catch (error: any) {
      if (error?.response?.status === 401) {
        toast.error('Session expired. Please login again');
        logout();
      } else {
        toast.error('Failed to load messages');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchMessages();

    const ws = new WebSocket(WEBSOCKET_URL);

    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setMessages(prev => [...prev, message]);
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    };

    return () => {
      ws.close();
    };
  }, [token, router]);

  const handleMessageSent = (message: Message) => {
    setMessages(prev => [...prev, message]);
  };

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">Welcome, {user.name}!</h1>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <WebhookForm onMessageSent={handleMessageSent} />
              <MessageList 
                messages={messages} 
                currentUserId={user.id.toString()} 
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}