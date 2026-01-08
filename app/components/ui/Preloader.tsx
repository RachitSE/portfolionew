"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation
    const duration = 2000; // 2 seconds
    const start = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - start;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        // Wait a tiny bit at 100% before lifting
        setTimeout(() => setIsLoading(false), 500);
      }
    };

    requestAnimationFrame(animate);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] text-white"
        >
          {/* 1. Ambient Background Glow (Subtle & Premium) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <motion.div 
               animate={{ 
                 scale: [1, 1.2, 1], 
                 opacity: [0.3, 0.5, 0.3],
                 rotate: [0, 90, 0]
               }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-purple-500/20 blur-[100px] rounded-full" 
             />
          </div>

          {/* 2. The Minimalist Container */}
          <div className="relative z-10 w-64 flex flex-col gap-4">
             
             {/* Brand / Status */}
             <div className="flex justify-between items-end">
                <span className="text-sm font-bold tracking-[0.2em] text-white">RACHIT</span>
                <span className="text-xs font-mono text-gray-500">{Math.floor(progress)}%</span>
             </div>

             {/* The "Photon" Progress Bar */}
             <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "linear", duration: 0 }} // Controlled by state
                />
                {/* The "Shine" Effect leading the bar */}
                <motion.div 
                   className="absolute top-0 h-full w-20 bg-white/50 blur-[5px]"
                   style={{ left: `${progress}%`, translateX: "-100%" }}
                />
             </div>

             {/* Footer Text */}
             <div className="text-[10px] text-gray-600 uppercase tracking-widest text-center mt-2">
                Loading Experience
             </div>

          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}