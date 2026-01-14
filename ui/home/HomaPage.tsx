"use client";

import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-black font-sans selection:bg-yellow-200 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-8 py-5 sticky top-0 z-50 bg-[#F5F5F5]">
        <div className="flex items-center gap-3">
          {/* Logo Icon - 3 vertical bars */}
          <div className="flex gap-[3px]">
            <div className="w-[3px] h-6 bg-black"></div>
            <div className="w-[3px] h-6 bg-black"></div>
            <div className="w-[3px] h-6 bg-black"></div>
          </div>
          <span className="text-sm font-medium tracking-wide">WEAVY</span>
          <div className="w-px h-4 bg-black/20 mx-1"></div>
          <span className="text-[10px] uppercase tracking-[0.15em] opacity-60">
            Artistic<br />Intelligence
          </span>
        </div>

        <div className="flex items-center gap-10 text-[11px] font-medium uppercase tracking-[0.12em]">
          <a href="#" className="hover:opacity-50 transition-opacity">Collective</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Enterprise</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Pricing</a>
          <a href="#" className="hover:opacity-50 transition-opacity">Request a Demo</a>

          {/* SIGNED OUT */}
          <SignedOut>
            <SignInButton forceRedirectUrl="/dashboard">
              <button className="hover:opacity-50 transition-opacity">
                Sign In
              </button>
            </SignInButton>

            <SignUpButton forceRedirectUrl="/dashboard">
              <button className="bg-[#EFFF33] px-6 py-3 rounded-sm hover:bg-black hover:text-white transition-all text-base font-semibold normal-case tracking-normal">
                Start Now
              </button>
            </SignUpButton>
          </SignedOut>

          {/* SIGNED IN */}
          <SignedIn>
            <Link
              href="/dashboard"
              className="bg-[#EFFF33] px-6 py-3 rounded-sm hover:bg-black hover:text-white transition-all text-base font-semibold normal-case tracking-normal"
            >
              Dashboard
            </Link>
          </SignedIn>
        </div>
      </nav>

      {/* HERO */}
      <main className="pt-16 pb-10 px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-row items-baseline gap-x-16">
            <h1 className="text-[110px] font-normal tracking-[-0.02em] leading-[1] italic" style={{ fontFamily: 'Georgia, serif' }}>
              Weavy
            </h1>
            <h2 className="text-[110px] font-normal tracking-[-0.02em] leading-[1]" style={{ fontFamily: 'Georgia, serif' }}>
              Artistic Intelligence
            </h2>
          </div>

          <div className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed opacity-70">
              Turn your creative vision into scalable workflows.
              <br />
              Access all AI models and professional editing tools
              <br />
              in one node based platform.
            </p>
          </div>
        </div>

        {/* WORKFLOW CARDS SECTION */}
        <div className="mt-16 relative h-[450px] max-w-[1400px] mx-auto">
          {/* SVG Connecting Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
            {/* Line from 3D card to Image card */}
            <path
              d="M 280 180 Q 320 180, 350 200 Q 380 220, 400 280"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            {/* Connection dot */}
            <circle cx="280" cy="180" r="4" fill="white" stroke="#D1D5DB" strokeWidth="2" />
            
            {/* Line from Image card to Text card */}
            <path
              d="M 620 180 Q 680 180, 720 200 Q 760 220, 780 240"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            <circle cx="620" cy="180" r="4" fill="white" stroke="#D1D5DB" strokeWidth="2" />
            <circle cx="780" cy="240" r="4" fill="white" stroke="#D1D5DB" strokeWidth="2" />
            
            {/* Line from Text card to Video card */}
            <path
              d="M 920 180 Q 980 180, 1020 160 Q 1060 140, 1100 120"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            <circle cx="920" cy="180" r="4" fill="white" stroke="#D1D5DB" strokeWidth="2" />
            
            {/* Line from Image card down to Flux card */}
            <path
              d="M 620 350 Q 680 380, 750 400"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="2"
            />
            <circle cx="620" cy="350" r="4" fill="white" stroke="#D1D5DB" strokeWidth="2" />
          </svg>

          {/* 3D RODIN Card */}
          <div className="absolute left-0 top-[60px]" style={{ zIndex: 2 }}>
            <div className="flex items-center gap-3 mb-2 text-[10px] tracking-[0.2em] uppercase">
              <span className="font-semibold">3D</span>
              <span className="opacity-50">Rodin 2.0</span>
            </div>
            <div className="w-[200px] h-[220px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden shadow-sm">
              <div className="w-full h-full bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 flex items-center justify-center">
                <div className="w-20 h-28 bg-gradient-to-b from-gray-400 to-gray-500 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>

          {/* IMAGE Stable Diffusion Card */}
          <div className="absolute left-[320px] top-[100px]" style={{ zIndex: 2 }}>
            <div className="flex items-center gap-3 mb-2 text-[10px] tracking-[0.2em] uppercase">
              <span className="font-semibold">Image</span>
              <span className="opacity-50">Stable Diffusion</span>
            </div>
            <div className="w-[260px] h-[280px] bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 rounded-lg overflow-hidden shadow-sm">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-24 h-32 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full opacity-70"></div>
              </div>
            </div>
          </div>

          {/* TEXT Card */}
          <div className="absolute left-[620px] top-[80px]" style={{ zIndex: 2 }}>
            <div className="flex items-center gap-3 mb-2 text-[10px] tracking-[0.2em] uppercase">
              <span className="font-semibold">Text</span>
            </div>
            <div className="w-[200px] p-4 bg-white rounded-lg shadow-sm border border-gray-100">
              <p className="text-[11px] leading-relaxed opacity-70">
                a Great-Tailed Grackle bird is flying from the background and seating on the model&apos;s shoulder slowly and barely moves. the model looks at the camera. then bird flies away. cinematic.
              </p>
            </div>
          </div>

          {/* VIDEO Minimax Card */}
          <div className="absolute right-0 top-0" style={{ zIndex: 2 }}>
            <div className="flex items-center gap-3 mb-2 text-[10px] tracking-[0.2em] uppercase">
              <span className="font-semibold">Video</span>
              <span className="opacity-50">Minimax Video</span>
            </div>
            <div className="w-[280px] h-[300px] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-lg overflow-hidden shadow-lg">
              <div className="w-full h-full flex items-end justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-800/50 to-transparent"></div>
                <div className="w-28 h-36 bg-gradient-to-b from-blue-700 to-blue-800 rounded-t-full mb-0 opacity-80"></div>
                {/* Bird silhouette */}
                <div className="absolute bottom-20 right-16 w-8 h-6 bg-blue-400 rounded-full transform -rotate-12"></div>
              </div>
            </div>
          </div>

          {/* IMAGE Flux Pro Card */}
          <div className="absolute left-[580px] bottom-0" style={{ zIndex: 2 }}>
            <div className="flex items-center gap-3 mb-2 text-[10px] tracking-[0.2em] uppercase">
              <span className="font-semibold">Image</span>
              <span className="opacity-50">Flux Pro 1.1</span>
            </div>
            <div className="w-[180px] h-[100px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg overflow-hidden shadow-sm border border-gray-200">
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-12 h-16 bg-gradient-to-b from-gray-300 to-gray-400 rounded-full opacity-60"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
