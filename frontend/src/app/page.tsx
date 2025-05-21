'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

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
            {user ? 'Manage your account and settings' : 'Get started by signing up or logging in'}
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

        
          <div className="mt-12 mb-10" >
            <p className="mt-3 text-center text-gray-600">
              I've created a full-stack application using Next.js and Express.js with real-time webhook data.
            </p>
            <div className=" flex flex-col items-center justify-center text-gray-600">
              <p className="mt-3 text-left text-gray-600">
                <b>Frontend (Next.js):</b>
                <ul className="list-disc list-inside">
                  <li>Next.js 15.3 with App Router</li>
                  <li>TypeScript for type safety</li>
                  <li>Tailwind CSS for styling</li>
                  <li>React Hook Form + Zod for form validation</li>
                  <li>Axios for API requests</li>
                  <li>React Hot Toast for notifications</li>
                  <li>WebSocket for real-time updates</li>
                </ul>
                <b>Backend (Express.js):</b>
                <ul className="list-disc list-inside">
                  <li>Express.js with TypeScript</li>
                  <li>Prisma as ORM</li>
                  <li>PostgreSQL database</li>
                  <li>Socket.IO for real-time communication</li>
                  <li>JWT for authentication</li>
                  <li>bcrypt for password hashing</li>
                </ul>
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}