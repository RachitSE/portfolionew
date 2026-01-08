"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Command } from "lucide-react";
import Aurora from "../ui/Aurora";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#0b0f14] text-white selection:bg-cyan-500/30">
      {/* 1. The Aurora Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
        <Aurora
          colorStops={["#00d8ff", "#7cff67", "#00d8ff"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* 2. Content Grid */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-12">
        
        {/* LEFT: Text & Identity */}
        <div className="flex flex-col items-start space-y-8 max-w-2xl">
          
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="px-3 py-1 text-xs font-medium tracking-wider text-cyan-400 bg-cyan-950/30 border border-cyan-900/50 rounded-full uppercase flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Available for work
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight leading-tight"
          >
            Hi, I am Rachit. <br />
            I build <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
               premium
            </span> <br />
            web experiences.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-400 max-w-lg leading-relaxed"
          >
            Helping brands and businesses turn visitors into customers with high-performance, aesthetic websites.
          </motion.p>

          {/* Action Buttons Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-6"
          >
            {/* Main Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link href="/#projects" className="group relative px-8 py-3 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                View Work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link href="/#contact" className="px-8 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-sm">
                Contact Me
              </Link>
            </div>

            {/* --- NEW: AI FEATURE BUTTON (Standout) --- */}
            <div className="flex items-center gap-6">
               <Link href="/ask-ai" className="group relative inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 hover:border-purple-500/50 transition-all overflow-hidden">
                  {/* Glowing Background Blob */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
                     <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                     <div className="text-[10px] text-purple-400 font-bold uppercase tracking-wider">New Feature</div>
                     <div className="text-sm text-white font-medium group-hover:text-purple-200 transition-colors">Talk to my AI Clone &rarr;</div>
                  </div>
               </Link>
            </div>

            {/* Ctrl+K Hint (Subtle) */}
            <div className="mt-2 text-xs text-gray-600 font-mono flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
               <span className="flex items-center gap-1 bg-white/5 border border-white/10 px-1.5 py-0.5 rounded text-gray-400">
                 <Command className="w-3 h-3" /> K
               </span>
               <span>to open command palette</span>
            </div>

          </motion.div>
        </div>

        {/* RIGHT: Abstract Visual / Glass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="hidden md:block relative z-20"
        >
          {/* Decorative Glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-20 animate-pulse"></div>
          
          <div className="relative w-80 h-96 bg-[#0b0f14]/80 border border-white/10 rounded-2xl backdrop-blur-xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500 ease-out group">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-8">
               <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500/80" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                 <div className="w-3 h-3 rounded-full bg-green-500/80" />
               </div>
               <div className="text-[10px] font-mono text-gray-500">rachit_portfolio.tsx</div>
            </div>

            {/* Card Content Skeleton */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                 </div>
                 <div className="space-y-1">
                    <div className="h-2 w-24 bg-white/10 rounded animate-pulse" />
                    <div className="h-2 w-16 bg-white/10 rounded animate-pulse delay-75" />
                 </div>
              </div>
              
              <div className="h-32 w-full bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-xl border border-white/5 p-4 relative overflow-hidden group-hover:border-cyan-500/20 transition-colors">
                 {/* Mini animated element inside card */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-cyan-500/20 rounded-full blur-xl animate-pulse" />
                 <div className="font-mono text-[10px] text-gray-500 leading-relaxed">
                    &lt;Hero <br/>
                    &nbsp;&nbsp;status="premium"<br/>
                    &nbsp;&nbsp;animate={true}<br/>
                    /&gt;
                 </div>
              </div>
            </div>
            
            {/* Performance Badge */}
            <div className="absolute -bottom-6 -left-6 bg-[#0b0f14] border border-white/10 rounded-xl p-4 flex items-center gap-4 shadow-xl hover:scale-105 transition-transform cursor-default">
               <div className="relative w-12 h-12">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-gray-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                    <path className="text-emerald-400" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-emerald-400">100</div>
               </div>
               <div>
                 <div className="text-white font-bold text-sm">Performance</div>
                 <div className="text-xs text-gray-500">Optimization</div>
               </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;