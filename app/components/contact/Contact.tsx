"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter, Calculator } from "lucide-react";
import Link from "next/link";
import Globe from "../ui/Globe"; // Import the Globe

const Contact = () => {
  return (
    <section className="py-32 bg-[#0b0f14] relative z-20 overflow-hidden">
      
      {/* Background Glow moved to center/bottom */}
      <div className="absolute bottom-0 left-0 w-full h-[300px] bg-cyan-500/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* LEFT: Text & Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-6 block">
              Global Reach
            </span>
            
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
              From India to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">World.</span>
            </h2>

            <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
              I work with clients globally. Whether you are in New York, London, or Mumbai, let's build something exceptional together.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <a 
                href="mailto:rachit@example.com" 
                className="px-8 py-4 bg-white text-black font-bold rounded-full flex items-center gap-3 hover:bg-cyan-500 hover:scale-105 transition-all"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </a>
              
              <Link 
                href="/estimate"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-full flex items-center gap-3 hover:bg-white/10 transition-all hover:border-cyan-500/50"
              >
                <Calculator className="w-5 h-5 text-cyan-400" />
                Get Estimate
              </Link>
            </div>

            {/* Socials - Clean Row */}
            <div className="flex items-center gap-6 text-gray-500">
               <span className="text-xs uppercase tracking-widest font-bold">Follow Me</span>
               <div className="w-12 h-[1px] bg-white/10"></div>
               <a href="#" className="hover:text-cyan-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
               <a href="#" className="hover:text-cyan-400 transition-colors"><Twitter className="w-5 h-5" /></a>
               <a href="https://github.com/rachitse" className="hover:text-cyan-400 transition-colors"><Github className="w-5 h-5" /></a>
            </div>
          </motion.div>

          {/* RIGHT: The Globe */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center"
          >
             <Globe className="scale-110 md:scale-125" />
             
             {/* Optional: Floating Badge on top of globe */}
             <div className="absolute bottom-10 right-10 md:right-0 bg-[#0b0f14]/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl hidden md:block">
                <div className="flex items-center gap-3">
                   <div className="relative">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                   </div>
                   <div>
                      <div className="text-xs text-gray-400 uppercase tracking-wider font-bold">Status</div>
                      <div className="text-white font-bold">Accepting Projects</div>
                   </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;