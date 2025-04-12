interface ChatPreview {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
}

const mockChats: ChatPreview[] = [
  {
    id: '1',
    name: 'Sarah Wilson',
    lastMessage: 'See you tomorrow!',
    timestamp: '2:30 PM'
  },
  {
    id: '2',
    name: 'John Smith',
    lastMessage: 'How about the project deadline?',
    timestamp: '11:20 AM'
  },
  {
    id: '3',
    name: 'Emma Davis',
    lastMessage: 'Thanks for your help!',
    timestamp: 'Yesterday'
  },
];

export default function ChatSidebar() {
  return (
    <div className="w-full h-full border-r border-gray-200 dark:border-gray-800">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold">Messages</h2>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-5rem)]">
        {mockChats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {chat.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate">{chat.name}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {chat.timestamp}
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}