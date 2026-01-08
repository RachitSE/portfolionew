"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, Copy, Check, Terminal, Code2, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA (You can add real snippets later) ---
const ALL_SNIPPETS = [
  {
    id: "use-mouse",
    title: "useMousePosition",
    lang: "React Hook",
    desc: "Track mouse coordinates with performance in mind.",
    code: `const useMousePosition = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const updateMousePosition = ev => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return mousePosition;
};`
  },
  {
    id: "random-color",
    title: "Random Hex Generator",
    lang: "Utility",
    desc: "Generate a random hex color code instantly.",
    code: `const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};`
  },
  {
    id: "glass-card",
    title: "Glassmorphism Card",
    lang: "Tailwind",
    desc: "The perfect CSS backdrop-filter utility class set.",
    code: `<div className="
  bg-white/5 
  backdrop-blur-lg 
  border border-white/10 
  shadow-xl 
  rounded-2xl 
  p-6
">
  Content goes here...
</div>`
  }
];

export default function SnippetsPage() {
  const [search, setSearch] = useState("");
  const [selectedSnippet, setSelectedSnippet] = useState(ALL_SNIPPETS[0]);
  const [copied, setCopied] = useState(false);

  // Filter logic
  const filtered = ALL_SNIPPETS.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.lang.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white font-sans selection:bg-cyan-500/30 flex flex-col">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* --- HEADER --- */}
      <nav className="relative z-50 p-6 border-b border-white/5 bg-[#0b0f14]/80 backdrop-blur-md flex items-center justify-between">
         <div className="flex items-center gap-4">
            <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
               <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
               <h1 className="text-lg font-bold flex items-center gap-2">
                 <Terminal className="w-4 h-4 text-cyan-400" />
                 Code Vault
               </h1>
               <p className="text-xs text-gray-500">Reusable snippets & utilities</p>
            </div>
         </div>
         
         <div className="hidden md:flex items-center gap-3 bg-black/30 border border-white/10 rounded-full px-4 py-2 w-64">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search snippets..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-gray-600"
            />
         </div>
      </nav>

      {/* --- MAIN CONTENT LAYOUT --- */}
      <div className="flex-grow flex flex-col md:flex-row relative z-10 overflow-hidden h-[calc(100vh-80px)]">
         
         {/* LEFT: SIDEBAR LIST */}
         <aside className="w-full md:w-80 border-r border-white/5 overflow-y-auto bg-black/20 p-4 space-y-2">
            <div className="md:hidden mb-4 bg-black/30 border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2">
               <Search className="w-4 h-4 text-gray-500" />
               <input 
                 type="text" 
                 placeholder="Search..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="bg-transparent border-none outline-none text-sm w-full text-white"
               />
            </div>
            
            {filtered.map((snippet) => (
               <button
                 key={snippet.id}
                 onClick={() => { setSelectedSnippet(snippet); setCopied(false); }}
                 className={`w-full text-left p-4 rounded-xl border transition-all group relative overflow-hidden ${
                   selectedSnippet.id === snippet.id 
                     ? "bg-cyan-500/10 border-cyan-500/50" 
                     : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10"
                 }`}
               >
                  <div className="flex justify-between items-start mb-1">
                     <span className={`font-bold text-sm ${selectedSnippet.id === snippet.id ? "text-cyan-400" : "text-white"}`}>
                        {snippet.title}
                     </span>
                     <span className="text-[10px] uppercase tracking-wider text-gray-500 bg-black/30 px-2 py-0.5 rounded">
                        {snippet.lang}
                     </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1 group-hover:text-gray-400 transition-colors">
                     {snippet.desc}
                  </p>
               </button>
            ))}

            {filtered.length === 0 && (
               <div className="text-center py-10 text-gray-500 text-sm">
                  No snippets found.
               </div>
            )}
         </aside>

         {/* RIGHT: CODE VIEWER */}
         <section className="flex-grow bg-[#0c0c0c] flex flex-col overflow-hidden relative">
            
            {/* Toolbar */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#0b0f14]">
               <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                     <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                     <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                  </div>
                  <span className="text-xs text-gray-500 font-mono ml-2 border-l border-white/10 pl-3">
                     {selectedSnippet.title}.tsx
                  </span>
               </div>
               
               <button 
                 onClick={handleCopy}
                 className="flex items-center gap-2 text-xs font-medium text-gray-400 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-md border border-white/5"
               >
                  {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Copied!" : "Copy Code"}
               </button>
            </div>

            {/* Code Editor Area */}
            <div className="flex-grow overflow-auto p-6 font-mono text-sm relative group">
               <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-cyan-500/10 text-cyan-400 text-xs px-2 py-1 rounded border border-cyan-500/20">
                     Read-Only
                  </div>
               </div>

               <pre className="text-gray-300 leading-relaxed tab-4">
                  <code>
                     {selectedSnippet.code.split('\n').map((line, i) => (
                        <div key={i} className="table-row">
                           <span className="table-cell text-right pr-6 select-none text-gray-700 w-8">{i + 1}</span>
                           <span className="table-cell">{line}</span>
                        </div>
                     ))}
                  </code>
               </pre>
            </div>
            
            {/* Footer Status */}
            <div className="h-8 border-t border-white/5 bg-[#0b0f14] flex items-center px-4 gap-4 text-[10px] text-gray-500 select-none">
               <div className="flex items-center gap-1">
                  <Code2 className="w-3 h-3" /> TypeScript
               </div>
               <div className="flex items-center gap-1">
                  <Hash className="w-3 h-3" /> UTF-8
               </div>
               <div className="flex-grow text-right">
                  Ln {selectedSnippet.code.split('\n').length}, Col 1
               </div>
            </div>

         </section>

      </div>
    </main>
  );
}