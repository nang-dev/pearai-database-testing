import { useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    isCurrentUser: boolean;
  };
  timestamp: string;
}

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Hey, how are you?',
    sender: {
      name: 'Sarah Wilson',
      isCurrentUser: false,
    },
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    content: 'I\'m good, thanks! How about you?',
    sender: {
      name: 'You',
      isCurrentUser: true,
    },
    timestamp: '2:31 PM'
  },
  {
    id: '3',
    content: 'Great! Just working on the project.',
    sender: {
      name: 'Sarah Wilson',
      isCurrentUser: false,
    },
    timestamp: '2:32 PM'
  }
];

export default function ChatWindow() {
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: {
        name: 'You',
        isCurrentUser: true,
      },
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold">Sarah Wilson</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender.isCurrentUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-3 ${
                message.sender.isCurrentUser
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800'
              }`}
            >
              <p className="text-sm">{message.content}</p>
              <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-full px-4 py-2 bg-gray-100 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}