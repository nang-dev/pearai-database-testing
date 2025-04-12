"use client";

import { SignUp } from "@stackframe/stack";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <SignUp />
      </div>
    </div>
  );
}