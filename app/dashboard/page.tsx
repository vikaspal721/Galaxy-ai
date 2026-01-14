"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import {
  Plus,
  FolderOpen,
  Users,
  LayoutGrid,
  ChevronDown,
  Search,
  List,
  Grid3X3,
} from "lucide-react";

// Tutorial/Workflow cards data
const workflowLibrary = [
  {
    id: 1,
    title: "Weavy Welcome",
    image: "/tutorials/welcome.jpg",
    color: "from-cyan-600 to-blue-800",
  },
  {
    id: 2,
    title: "Weavy Iterators",
    image: "/tutorials/iterators.jpg",
    color: "from-yellow-600 to-amber-800",
  },
  {
    id: 3,
    title: "Multiple Image Models",
    image: "/tutorials/image-models.jpg",
    color: "from-blue-600 to-indigo-800",
  },
  {
    id: 4,
    title: "Editing Images",
    image: "/tutorials/editing.jpg",
    color: "from-rose-600 to-red-800",
  },
  {
    id: 5,
    title: "Compositor Node",
    image: "/tutorials/compositor.jpg",
    color: "from-purple-600 to-violet-800",
  },
  {
    id: 6,
    title: "Image to Video",
    image: "/tutorials/video.jpg",
    color: "from-amber-600 to-orange-800",
  },
];

// User files data
const userFiles = [
  {
    id: 1,
    title: "This is for my assigment work only",
    lastEdited: "5 hours ago",
  },
  {
    id: 2,
    title: "sdafasdfsadfjaskldfjklasd;jfkl",
    lastEdited: "11 days ago",
  },
  {
    id: 3,
    title: "untitled",
    lastEdited: "17 days ago",
  },
  {
    id: 4,
    title: "this is for application exploration only",
    lastEdited: "19 days ago",
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"library" | "tutorials">("library");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white flex">
      {/* ===== Left Sidebar ===== */}
      <aside className="w-60 flex flex-col border-r border-white/10 bg-[#0d0d0f]">
        {/* User Profile */}
        <div className="px-3 py-4">
          <button className="flex items-center gap-2 hover:bg-white/5 rounded-lg px-2 py-2 w-full transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-sm font-bold text-black">
              V
            </div>
            <span className="text-sm font-medium text-white/90">Vikas Pal</span>
            <ChevronDown size={14} className="text-white/50 ml-auto" />
          </button>
        </div>

        {/* Create New File Button */}
        <div className="px-3 mb-4">
          <Link
            href="/workflow/new"
            className="flex items-center justify-center gap-2 bg-[#d4e157] hover:bg-[#c0ca33] text-black px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors w-full"
          >
            <Plus size={18} strokeWidth={2.5} />
            Create New File
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          <NavItem icon={<FolderOpen size={18} />} label="My Files" active hasPlus />
          <NavItem icon={<Users size={18} />} label="Shared with me" />
          <NavItem icon={<LayoutGrid size={18} />} label="Apps" />
        </nav>

        {/* Discord Link */}
        <div className="px-3 py-4 border-t border-white/10">
          <a
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-colors px-2 py-2"
          >
            <DiscordIcon />
            <span className="text-sm">Discord</span>
          </a>
        </div>
      </aside>

      {/* ===== Main Content ===== */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-white/5">
          <h1 className="text-lg font-semibold text-white/90">
            Vikas Pal's Workspace
          </h1>
          <div className="flex items-center gap-4">
            <Link
              href="/workflow/new"
              className="flex items-center gap-2 bg-[#d4e157] hover:bg-[#c0ca33] text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              <Plus size={16} strokeWidth={2.5} />
              Create New File
            </Link>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        <div className="px-8 py-6">
          {/* Workflow Library Section */}
          <section className="mb-10">
            {/* Tabs */}
            <div className="flex gap-1 mb-5">
              <TabButton
                active={activeTab === "library"}
                onClick={() => setActiveTab("library")}
              >
                Workflow library
              </TabButton>
              <TabButton
                active={activeTab === "tutorials"}
                onClick={() => setActiveTab("tutorials")}
              >
                Tutorials
              </TabButton>
            </div>

            {/* Workflow Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {workflowLibrary.map((item) => (
                <WorkflowCard key={item.id} item={item} />
              ))}
            </div>
          </section>

          {/* My Files Section */}
          <section>
            {/* Header with Search */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-medium text-white/80">My files</h2>

              <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-white/20 w-48 transition-colors"
                  />
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-white/5 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "list"
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-1.5 rounded transition-colors ${
                      viewMode === "grid"
                        ? "bg-white/10 text-white"
                        : "text-white/40 hover:text-white/60"
                    }`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* File Cards */}
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                  : "flex flex-col gap-2"
              }
            >
              {userFiles.map((file) => (
                <FileCard key={file.id} file={file} viewMode={viewMode} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// ===== Components =====

function NavItem({
  icon,
  label,
  active = false,
  hasPlus = false,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  hasPlus?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors group ${
        active ? "text-white" : "text-white/50 hover:text-white/70 hover:bg-white/5"
      }`}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
      {hasPlus && (
        <Plus
          size={16}
          className="ml-auto opacity-0 group-hover:opacity-100 text-white/40 hover:text-white/70 transition-opacity"
        />
      )}
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        active
          ? "bg-white/10 text-white"
          : "text-white/50 hover:text-white/70 hover:bg-white/5"
      }`}
    >
      {children}
    </button>
  );
}

function WorkflowCard({ item }: { item: (typeof workflowLibrary)[number] }) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br ${item.color} relative mb-2`}
      >
        {/* Placeholder gradient pattern */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <LayoutGrid size={24} className="text-white/70" />
          </div>
        </div>
        {/* Title overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
          <span className="text-xs font-medium text-white/90">{item.title}</span>
        </div>
      </div>
    </div>
  );
}

function FileCard({
  file,
  viewMode,
}: {
  file: (typeof userFiles)[number];
  viewMode: "list" | "grid";
}) {
  if (viewMode === "list") {
    return (
      <div className="flex items-center gap-4 px-4 py-3 bg-white/5 hover:bg-white/8 rounded-lg cursor-pointer transition-colors group">
        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
          <FileIcon />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white/90 truncate">{file.title}</p>
          <p className="text-xs text-white/40">Last edited {file.lastEdited}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer">
      <div className="aspect-[4/3] bg-[#1a1a1c] hover:bg-[#222224] rounded-xl flex items-center justify-center transition-colors mb-2">
        <FileIcon />
      </div>
      <div className="px-1">
        <p className="text-sm font-medium text-white/90 truncate">{file.title}</p>
        <p className="text-xs text-white/40">Last edited {file.lastEdited}</p>
      </div>
    </div>
  );
}

function FileIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className="text-white/20"
    >
      <rect x="8" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="8" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="8" y="28" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="28" y="28" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <line x1="20" y1="14" x2="28" y2="14" stroke="currentColor" strokeWidth="2" />
      <line x1="14" y1="20" x2="14" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="34" y1="20" x2="34" y2="28" stroke="currentColor" strokeWidth="2" />
      <line x1="20" y1="34" x2="28" y2="34" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}
