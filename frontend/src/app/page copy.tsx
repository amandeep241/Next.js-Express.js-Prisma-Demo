"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-center text-gray-900">
            Welcome to Amandeep's App
          </h1>

          <p className="mt-3 text-center text-gray-600">
            {user
              ? "Manage your account and settings"
              : "Get started by signing up or logging in"}
          </p>
        </div>

        <div className="mt-8 space-y-4">
          {user ? (
            <Link
              href="/dashboard"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Go to Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        <div className="mt-12 mb-10">
          <p className="mt-3 text-center text-gray-600">
            I've created a full-stack application using Next.js and Express.js
            with real-time webhook data.
          </p>
          <div className="flex flex-col items-center justify-center text-gray-600">
            <div className="mt-3">
              <p className="font-bold">Frontend (Next.js):</p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li className="text-gray-600">Next.js 15.3 with App Router</li>
                <li className="text-gray-600">TypeScript for type safety</li>
                <li className="text-gray-600">Tailwind CSS for styling</li>
                <li className="text-gray-600">React Hook Form + Zod for form validation</li>
                <li className="text-gray-600">Axios for API requests</li>
                <li className="text-gray-600">React Hot Toast for notifications</li>
                <li className="text-gray-600">WebSocket for real-time updates</li>
              </ul>
              <p className="font-bold mt-4">Backend (Express.js):</p>
              <ul className="list-disc list-inside text-sm mt-2">
                <li className="text-gray-600">Express.js with TypeScript</li>
                <li className="text-gray-600">Prisma as ORM</li>
                <li className="text-gray-600">PostgreSQL database</li>
                <li className="text-gray-600">Socket.IO for real-time communication</li>
                <li className="text-gray-600">JWT for authentication</li>
                <li className="text-gray-600">bcrypt for password hashing</li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
