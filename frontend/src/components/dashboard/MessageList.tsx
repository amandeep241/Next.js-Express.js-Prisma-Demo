import { Message } from '@/types/message';

interface MessageListProps {
  messages: Message[];
  currentUserId?: string;
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  return (
    <div className="mt-8">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Messages</h2>
      <div className="flow-root">
        <ul role="list" className="-my-5 divide-y divide-gray-200">
          {messages.map((message) => (
            <li key={message.id} className="py-5">
              <div className="relative">
                {message.userId === currentUserId && (
                  <span className="absolute right-0 top-0 text-xs text-indigo-600">You</span>
                )}
                <h3 className="text-sm font-medium text-gray-900">
                  {message.name}
                  <span className="ml-2 text-xs text-gray-500">ID: {message.userId}</span>
                </h3>
                <p className="mt-1 text-sm text-gray-600">{message.message}</p>
                <p className="mt-1 text-xs text-gray-500">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}