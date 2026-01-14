"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/nextjs";
import { Plus } from "lucide-react";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-[#0b0b0d] text-white flex">
      
      {/* ================= SIGNED IN ================= */}
      <SignedIn>
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col border-r border-white/10 px-4 py-6">
          <h2 className="text-lg font-semibold mb-6">Workflow AI</h2>

          <Link
            href="/workflow/new"
            className="flex items-center gap-2 bg-yellow-200 text-black px-3 py-2 rounded-md text-sm font-medium"
          >
            <Plus size={16} />
            Create New File
          </Link>

          <nav className="mt-8 space-y-3 text-sm text-white/70">
            <p className="font-medium text-white">My Files</p>
            <p className="opacity-50">Shared with me</p>
            <p className="opacity-50">Apps</p>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 px-4 md:px-8 py-6">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-xl font-semibold">Vikas Pal’s Workspace</h1>
            <UserButton />
          </div>

          {/* Workflow Library */}
          <section>
            <h2 className="text-sm text-white/60 mb-4">
              Workflow library
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                "Welcome",
                "Image Models",
                "Editing",
                "Composer",
                "Image to Video",
                "More",
              ].map((item) => (
                <div
                  key={item}
                  className="aspect-video bg-white/5 rounded-lg flex items-center justify-center text-xs text-white/70 hover:bg-white/10 cursor-pointer"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* My Files */}
          <section className="mt-10">
            <h2 className="text-sm text-white/60 mb-4">
              My files
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                "Assignment work",
                "Exploration",
                "Untitled",
                "Test File",
              ].map((file) => (
                <div
                  key={file}
                  className="h-40 bg-white/5 rounded-lg flex flex-col justify-end p-3 text-sm text-white/70 hover:bg-white/10 cursor-pointer"
                >
                  {file}
                </div>
              ))}
            </div>
          </section>
        </main>
      </SignedIn>

      {/* ================= SIGNED OUT ================= */}
      <SignedOut>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold">
              You’re not signed in
            </h2>

            <p className="text-white/60">
              Sign in to access your workflows.
            </p>

            <SignInButton>
              <button className="bg-yellow-200 text-black px-6 py-2 rounded-md text-sm font-medium">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </SignedOut>
    </div>
  );
}
