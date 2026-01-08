"use client";

import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ExternalLink, Github, Layers, Zap, BarChart3, Globe, Lock, Code2 } from "lucide-react";
import { projects } from "@/app/lib/projectData"; 

export default function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  if (!project) return null;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      
      {/* 1. DYNAMIC ATMOSPHERE BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className={`absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-gradient-to-br ${project.gradientFrom} to-transparent opacity-20 blur-[120px]`} />
         <div className={`absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-gradient-to-tl ${project.gradientTo} to-transparent opacity-20 blur-[120px]`} />
         <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay" />
      </div>

      {/* 2. NAVIGATION */}
      <nav className="fixed top-0 left-0 w-full z-50 p-6 flex justify-between items-center bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <Link href="/#projects" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-xs font-bold uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Base
        </Link>
        <div className="flex items-center gap-4">
           <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-mono text-gray-400">STATUS: DEPLOYED</span>
           </div>
           <a href={project.links.demo} target="_blank" className="flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-all border border-white/5">
              OPEN APP <ExternalLink className="w-3 h-3" />
           </a>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative pt-40 pb-20 px-6 container mx-auto z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl"
        >
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-mono text-cyan-400 mb-8">
              CASE STUDY 00{Math.floor(Math.random() * 9) + 1} // {project.category.toUpperCase()}
           </div>
           
           <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40 leading-[0.9]">
             {project.title}
           </h1>
           
           <p className="text-xl md:text-3xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
             {project.tagline}
           </p>
        </motion.div>
      </section>

      {/* 4. THE FLOATING BROWSER (Image or Fallback) */}
      <section className="container mx-auto px-4 md:px-6 z-10 relative mb-32">
         <motion.div 
           style={{ y: y1 }}
           initial={{ opacity: 0, scale: 0.9, rotateX: 20 }}
           animate={{ opacity: 1, scale: 1, rotateX: 0 }}
           transition={{ duration: 1, delay: 0.2, type: "spring" }}
           className="max-w-7xl mx-auto perspective-1000"
         >
            <div className="rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden relative group">
               
               {/* Browser Toolbar */}
               <div className="h-12 border-b border-white/5 bg-[#0f0f0f] flex items-center px-4 gap-4">
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                     <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                     <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  </div>
                  <div className="flex-grow max-w-xl mx-auto">
                     <div className="h-8 w-full bg-[#050505] rounded-lg border border-white/5 flex items-center px-4 justify-center text-xs text-gray-600 font-mono gap-2 transition-colors group-hover:text-gray-400 group-hover:border-white/10">
                        <Lock className="w-3 h-3" />
                        {project.links.demo.replace('https://', '')}
                     </div>
                  </div>
                  <div className="w-16" /> {/* Spacer for centering */}
               </div>

               {/* VIEWPORT CONTENT */}
               <div className="aspect-video w-full bg-[#050505] relative flex items-center justify-center overflow-hidden">
                  
                  {/* --- LOGIC: If Image exists, show it. If not, show Styled Title --- */}
                  {/* @ts-ignore */}
                  {project.image && project.image.trim() !== "" ? (
                     <img 
                       src={project.image} 
                       alt={project.title} 
                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                  ) : (
                     // FALLBACK DESIGN (Typographic Poster)
                     <div className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} opacity-20 blur-[100px] animate-pulse`} />
                        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-20 mix-blend-overlay" />
                        
                        <div className="relative z-10 text-center">
                           <h2 className="text-[120px] md:text-[200px] font-black text-white/5 tracking-tighter leading-none select-none">
                              {project.title}
                           </h2>
                           <div className="absolute inset-0 flex items-center justify-center">
                              <div className="px-8 py-4 border border-white/10 bg-black/50 backdrop-blur-xl rounded-full text-sm font-mono text-gray-400 flex items-center gap-3">
                                 <div className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                                 PREVIEW_UNAVAILABLE
                              </div>
                           </div>
                        </div>
                     </div>
                  )}

               </div>
            </div>
         </motion.div>
      </section>

      {/* 5. DEEP DIVE GRID */}
      <section className="container mx-auto px-6 pb-32 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 max-w-7xl mx-auto">
          
          {/* LEFT: STORYTELLING */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Challenge */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative pl-8 border-l-2 border-white/10"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4 flex items-center gap-2">
                01 <Layers className="w-3 h-3" /> The Challenge
              </h3>
              <p className="text-2xl md:text-3xl text-gray-200 leading-relaxed font-light">
                {project.challenge}
              </p>
            </motion.div>
            
            {/* Solution */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="relative pl-8 border-l-2 border-white/10"
            >
              <h3 className="text-xs font-bold uppercase tracking-widest text-yellow-400 mb-4 flex items-center gap-2">
                02 <Zap className="w-3 h-3" /> The Solution
              </h3>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                {project.solution}
              </p>
            </motion.div>

            {/* Quote / Highlight Box */}
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
               <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${project.gradientTo} to-transparent opacity-20 blur-3xl`} />
               <QuoteIcon className="w-8 h-8 text-white/20 mb-4" />
               <p className="text-xl font-medium text-white italic">
                  "{project.description}"
               </p>
            </div>

          </div>

          {/* RIGHT: STICKY DATA HUD */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0a0a0a]/80 border border-white/10 p-8 rounded-3xl backdrop-blur-xl sticky top-32 shadow-2xl">
               
               {/* Tech Stack */}
               <div className="mb-10">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <Code2 className="w-3 h-3" /> Technology Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech: string) => (
                      <span key={tech} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-mono text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/30 transition-all cursor-default">
                        {tech}
                      </span>
                    ))}
                  </div>
               </div>

               {/* Metrics */}
               <div className="mb-10">
                  <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                     <BarChart3 className="w-3 h-3" /> Performance Metrics
                  </h4>
                  <div className="space-y-4">
                    {project.metrics.map((metric: any) => (
                      <div key={metric.label} className="flex justify-between items-end pb-3 border-b border-white/5 last:border-0 group">
                        <span className="text-gray-500 text-sm group-hover:text-gray-300 transition-colors">{metric.label}</span>
                        <span className="text-white font-bold font-mono text-lg">{metric.value}</span>
                      </div>
                    ))}
                  </div>
               </div>

               {/* Actions */}
               <div className="flex flex-col gap-3">
                  <a href={project.links.demo} target="_blank" className="w-full py-4 bg-white text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-cyan-400 hover:scale-[1.02] transition-all">
                     <Globe className="w-4 h-4" /> Visit Live Site
                  </a>
                  {project.links.code !== "#" && (
                     <a href={project.links.code} target="_blank" className="w-full py-4 border border-white/10 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors">
                        <Github className="w-4 h-4" /> View Source Code
                     </a>
                  )}
               </div>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}

// Icon Helper
const QuoteIcon = ({ className }: { className?: string }) => (
   <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.01697 21L5.01697 18C5.01697 16.8954 5.9124 16 7.01697 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H6.01697C5.46468 8 5.01697 8.44772 5.01697 9V11C5.01697 11.5523 4.56925 12 4.01697 12H3.01697V5H13.017V15C13.017 18.3137 10.3307 21 7.01697 21H5.01697Z" />
   </svg>
);