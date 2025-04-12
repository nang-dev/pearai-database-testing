"use client";

import Link from "next/link";
import Image from "next/image";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import { useUser, UserButton } from "@stackframe/stack";

export default function Home() {
  const user = useUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Image
                  src="/globe.svg"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="dark:invert"
                />
                <span className="ml-2 text-xl font-bold">PearChat</span>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/signin">
                  <button className="px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors">
                    Sign In
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
                Connect with anyone,
                <br />
                anywhere in the world
              </h1>
              <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Experience seamless communication with PearChat. Send messages, share files,
                and stay connected with friends, family, and colleagues.
              </p>
              <div className="mt-10">
                <Link href="/signup">
                  <button className="px-8 py-3 text-lg bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                    Start Chatting Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Image
                    src="/window.svg"
                    alt="Real-time"
                    width={24}
                    height={24}
                    className="dark:invert"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Real-time Messaging</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Instant message delivery and typing indicators for smooth conversations
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <Image
                    src="/file.svg"
                    alt="File Sharing"
                    width={24}
                    height={24}
                    className="dark:invert"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">File Sharing</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Share documents, images, and files securely with your contacts
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Image
                    src="/globe.svg"
                    alt="Cross Platform"
                    width={24}
                    height={24}
                    className="dark:invert"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Cross Platform</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Access your messages from any device, anytime, anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-gray-900">
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <Image
            src="/globe.svg"
            alt="Logo"
            width={24}
            height={24}
            className="dark:invert"
          />
          <h1 className="text-xl font-semibold ml-2">PearChat</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {user.primaryEmail}
          </span>
          <UserButton />
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
