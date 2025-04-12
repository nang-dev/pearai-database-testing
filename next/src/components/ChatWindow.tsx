import { useUser } from '@stackframe/stack';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  sender_id: string;
  receiver_id: string;
  created_at: string;
  sender_email: string;
}

interface Friend {
  id: string;
  email: string;
  status: string;
}

interface ChatWindowProps {
  selectedFriend?: Friend;
}

export default function ChatWindow({ selectedFriend }: ChatWindowProps) {
  const user = useUser({ or: 'redirect' });
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedFriend) {
      fetchMessages();

      console.log('Setting up SSE connection...');
      const eventSource = new EventSource(`/api/messages/subscribe?friendId=${selectedFriend.id}`);

      eventSource.onopen = () => {
        console.log('SSE connection established');
      };

      eventSource.onmessage = (event) => {
        console.log('Received new message:', event.data);
        try {
          const newMessage = JSON.parse(event.data);

          // Ignore connection test messages
          if (newMessage.type === 'connected') {
            console.log('SSE connection test received');
            return;
          }

          // Validate message structure
          if (!newMessage.id || !newMessage.content || !newMessage.sender_id) {
            console.error('Invalid message structure:', newMessage);
            return;
          }

          setMessages(prev => {
            // Check if message already exists
            if (prev.some(msg => msg.id === newMessage.id)) {
              return prev;
            }

            // Add new message and sort by timestamp
            const updatedMessages = [...prev, newMessage].sort((a, b) =>
              new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );

            // Scroll to bottom on new message
            setTimeout(scrollToBottom, 100);

            return updatedMessages;
          });
        } catch (error) {
          console.error('Error processing message:', error);
        }
      };

      eventSource.onerror = (error) => {
        console.error('EventSource failed:', error);
        eventSource.close();
      };

      // Cleanup when component unmounts or friend changes
      return () => {
        eventSource.close();
      };
    } else {
      setMessages([]);
    }
  }, [selectedFriend]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    if (!selectedFriend) return;

    try {
      const response = await fetch(`/api/messages?friendId=${selectedFriend.id}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(data.reverse()); // Reverse to show newest messages at the bottom
    } catch (err) {
      console.error('Error fetching messages:', err);
      setError('Failed to load messages');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFriend || !newMessage.trim()) return;

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          receiverId: selectedFriend.id,
          content: newMessage.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send message');
      }

      setNewMessage('');
      fetchMessages(); // Refresh messages
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  if (!selectedFriend) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a friend to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">{selectedFriend.email}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender_id === user?.id ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.sender_id === user?.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <p>{message.content}</p>
              <p className="text-xs mt-1 opacity-70">
                {new Date(message.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}