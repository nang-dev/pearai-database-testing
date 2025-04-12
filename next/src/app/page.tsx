"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-semibold">Chat App</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {user.email}
          </span>
          <button
            onClick={signOut}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-80 border-r border-gray-200 dark:border-gray-800">
          <ChatSidebar />
        </div>
        <div className="flex-1">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
