"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Workflow AI</h1>
          {user ? (
            <div className="flex items-center gap-4">
              <span>{user.emailAddresses[0]?.emailAddress}</span>
              <Link
                href="/workflow/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                New Workflow
              </Link>
            </div>
          ) : (
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Sign In
            </Link>
          )}
        </div>

        {user && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Workflows will be loaded here */}
              <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-gray-500">No workflows yet. Create one to get started!</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
