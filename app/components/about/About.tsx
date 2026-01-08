"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Layout, Globe, Code2, Database, Rocket } from "lucide-react";

const features = [
  {
    icon: <Rocket className="w-6 h-6 text-cyan-400" />,
    title: "Performance Obsessed",
    desc: "I don't just write code; I engineer speed. I optimize Core Web Vitals to ensure your site loads instantly, boosting SEO and user retention.",
  },
  {
    icon: <Layout className="w-6 h-6 text-purple-400" />,
    title: "Interaction-First Design",
    desc: "Static sites are boring. I build immersive, fluid interfaces using modern motion libraries that make your brand feel premium and alive.",
  },
  {
    icon: <Database className="w-6 h-6 text-emerald-400" />,
    title: "Scalable Architecture",
    desc: "Built for growth. Whether it's a complex SaaS platform or a high-traffic event site, I design backends that handle scale without breaking.",
  },
];

const techStack = [
  "Next.js 15", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Supabase", "Node.js", "Git"
];

const About = () => {
  return (
    <section className="py-32 bg-[#0b0f14] relative z-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            The Developer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Engineering digital products <br className="hidden md:block" />
            that <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">drive real growth.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            I’m a full-stack developer who combines technical precision with creative problem-solving. 
            From robust service platforms like <span className="text-white font-medium">Moboflix</span> to social impact projects like <span className="text-white font-medium">Jaago</span>, 
            I build software that works as good as it looks.
          </p>
        </motion.div>

        {/* 3 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.05] transition-all duration-300 group"
            >
              <div className="mb-6 p-4 bg-white/[0.05] rounded-2xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/[0.05]">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Strip */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="border-t border-white/[0.08] pt-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3 text-gray-400">
              <Code2 className="w-5 h-5 text-cyan-400" />
              <span className="font-semibold text-sm tracking-widest uppercase">Technologies</span>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {techStack.map((tech, i) => (
                <span 
                  key={i} 
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-[#161b22] border border-white/[0.08] text-gray-300 hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;