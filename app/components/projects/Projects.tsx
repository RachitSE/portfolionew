"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock } from "lucide-react";
import Link from "next/link";

// 1. Data updated with Capital & Aether
const projects = [
  {
    slug: "moboflix",
    title: "MOBOFLIX",
    category: "Service Platform",
    description: "A robust home mobile repairing platform. Features real-time service booking, technician management, and a seamless user experience.",
    tags: ["React", "Node.js", "MongoDB"],
    gradientFrom: "from-cyan-500/20",
    gradientTo: "to-blue-600/20",
    hoverText: "group-hover:from-cyan-300 group-hover:to-blue-400",
  },
  {
    slug: "capital",
    title: "CAPITAL",
    category: "Fintech Dashboard",
    description: "High-performance asset management interface. Features real-time stock visualization, tilt-card physics, and transaction ledgers.",
    tags: ["TypeScript", "Zustand", "Recharts"],
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-teal-600/20",
    hoverText: "group-hover:from-emerald-300 group-hover:to-teal-400",
  },
  {
    slug: "aether",
    title: "AETHER",
    category: "E-Commerce Experience",
    description: "A premium digital storefront for artisanal coffee. Focuses on sensory web design, fluid page transitions, and brand aesthetics.",
    tags: ["Next.js", "Framer Motion", "UI/UX"],
    gradientFrom: "from-amber-500/20",
    gradientTo: "to-orange-600/20",
    hoverText: "group-hover:from-amber-300 group-hover:to-orange-400",
  },
  {
    slug: "calibre",
    title: "CALIBRE '25",
    category: "Event Tech",
    description: "The official digital platform for Calibre 2025. Handles high-traffic information dissemination and event schedules.",
    tags: ["Next.js", "Vercel Analytics"],
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-pink-600/20",
    hoverText: "group-hover:from-purple-300 group-hover:to-pink-400",
  },
  {
    slug: "jaago",
    title: "JAAGO",
    category: "Non-Profit",
    description: "A high-impact digital presence for a social cause. Focused on accessibility and clear information architecture.",
    tags: ["React", "Social Impact"],
    gradientFrom: "from-rose-500/20",
    gradientTo: "to-red-600/20",
    hoverText: "group-hover:from-rose-300 group-hover:to-red-400",
  }
];

const Projects = () => {
  return (
    <section className="py-32 bg-[#0b0f14] relative z-20">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
              Selected Work
            </span>
            <h2 className="text-4xl font-bold text-white">
              Featured <span className="text-gray-500">Projects</span>
            </h2>
          </motion.div>

          <motion.a 
            href="https://github.com/rachitse" 
            target="_blank"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group"
          >
            View GitHub Profile 
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </motion.a>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* FIX: Link now goes to internal case study page */}
              <Link href={`/work/${project.slug}`} className="block h-full flex flex-col">
                
                {/* 2. THE NEW TYPOGRAPHIC HEADER */}
                <div className="relative h-64 p-6 flex items-center justify-center overflow-hidden bg-[#0b0f14]">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradientFrom} ${project.gradientTo} opacity-30 blur-3xl group-hover:opacity-50 group-hover:scale-110 transition-all duration-700 ease-in-out`} />
                  <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                  <h3 className={`relative z-10 text-4xl md:text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 ${project.hoverText} transition-all duration-500 group-hover:scale-105`}>
                    {project.title}
                  </h3>
                </div>

                {/* Project Details */}
                <div className="p-8 flex flex-col flex-grow border-t border-white/5 bg-white/[0.01]">
                  <div className="mb-4">
                      <span className="text-xs font-bold text-cyan-400 tracking-widest uppercase mb-2 block">
                        {project.category}
                      </span>
                  </div>

                  <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-grow line-clamp-3 font-medium">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] font-semibold px-3 py-1 rounded-full bg-white/5 text-gray-300 border border-white/10 uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center gap-2 text-sm font-bold text-gray-500 group-hover:text-cyan-400 transition-colors">
                      View Case Study <ArrowUpRight className="w-4 h-4" />
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}

          {/* THE "CONFIDENTIAL WORK" CARD */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="rounded-3xl border border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center p-8 text-center min-h-[400px]"
            >
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6">
                <Lock className="w-6 h-6 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">30+ Hidden Projects</h3>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
                I have architected over 30+ digital solutions. Due to strict NDAs and enterprise confidentiality, only a select few are showcased here.
              </p>
              <div className="mt-8 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-400">
                ASK FOR CASE STUDIES
              </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Projects;