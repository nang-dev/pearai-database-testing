'use client';

import { useUser } from '@stackframe/stack';
import ChatSidebar from '@/components/ChatSidebar';
import ChatWindow from '@/components/ChatWindow';
import { useState, useEffect } from 'react';

interface UserInfo {
  email?: string;
  name?: string;
}

interface Friend {
  id: string;
  email: string;
  status: string;
}

export default function Home() {
  const user = useUser({ or: 'redirect' });
  const [selectedFriend, setSelectedFriend] = useState<Friend | undefined>();
  const [userInfo, setUserInfo] = useState<UserInfo>({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('/api/user');
        if (!response.ok) return;
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    if (user) {
      fetchUserInfo();
    }
  }, [user]);

  if (!user) {
    return null; // Will redirect due to useUser hook
  }

  const handleSignOut = () => {
    // Clear any local storage or cookies if needed
    localStorage.clear();
    // Redirect to sign-in page
    window.location.href = '/signin';
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold">Chat App</h1>
            <div className="flex items-center space-x-2">
              {userInfo.name && (
                <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">
                  {userInfo.name}
                </span>
              )}
              {userInfo.email && (
                <span className="text-sm text-blue-200">
                  {userInfo.email}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <ChatSidebar
          onSelectFriend={setSelectedFriend}
          selectedFriendId={selectedFriend?.id}
        />
        <ChatWindow selectedFriend={selectedFriend} />
      </main>
    </div>
  );
}
