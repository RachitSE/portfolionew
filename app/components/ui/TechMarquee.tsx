"use client";

import React from "react";
import { Database, FileCode2, Github, Layers, Boxes, Server } from "lucide-react";

// Brand SVGs (Inline for immediate use without external files)
const NextJsIcon = () => (
  <svg viewBox="0 0 180 180" width="24" height="24" className="fill-current"><path mask="url(#a)" d="M90 0c49.706 0 90 40.294 90 90s-40.294 90-90 90S0 139.706 0 90 40.294 0 90 0Zm0 16.2c-40.759 0-73.8 33.041-73.8 73.8s33.041 73.8 73.8 73.8 73.8-33.041 73.8-73.8-33.041-73.8-73.8-73.8Zm25.319 112.334L135.9 94.78V49.12h-13.004v28.093l-26.577 26.577v-54.67h-12.996v78.666h13.823l17.726-17.739v17.739l.447.748ZM57.096 49.12v78.666h12.996V49.12H57.096Z"></path><defs><mask id="a"><path fill="#fff" d="M0 0h180v180H0z"></path></mask></defs></svg>
);

const ReactIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="-11.5 -10.23174 23 20.46348" width="24" height="24" className="fill-current"><circle cx="0" cy="0" r="2.05" fill="#61dafb"/><g stroke="#61dafb" strokeWidth="1" fill="none"><ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/></g></svg>
);

const TailwindIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current text-[#38bdf8]"><path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C7.666,17.818,9.027,19.2,12.001,19.2c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"></path></svg>
);

const TypeScriptIcon = () => (
  <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="fill-current text-[#3178c6]"><path d="M0 0h24v24H0z" fill="none"/><path d="M1.5 0h21l1.5 1.5v21l-1.5 1.5h-21l-1.5-1.5v-21z" fill="#3178c6"/><path d="M11.617 12.393h2.354v-1.332h-7.17v1.332h2.353v8.404h2.463v-8.404zm9.977 2.33c-.137-1.03-1.015-1.74-2.494-1.74-1.546 0-2.244 1.064-2.244 2.111 0 1.172.996 1.696 2.743 2.202 1.751.525 2.53.986 2.53 2.375 0 1.48-1.123 2.38-2.768 2.38-1.645 0-2.867-.86-3.053-2.204l2.203-.256c.123.806.917 1.078 1.354 1.078.748 0 1.16-.426 1.16-1.058 0-1.026-.967-1.51-2.867-2.16-1.684-.597-2.303-1.297-2.303-2.506 0-1.358 1.12-2.317 2.555-2.317 1.657 0 2.506.915 2.705 1.905l-2.52.256z" fill="#fff"/></svg>
);

const techStack = [
  { name: "Next.js 15", icon: <NextJsIcon /> },
  { name: "React", icon: <ReactIcon /> },
  { name: "TypeScript", icon: <TypeScriptIcon /> },
  { name: "Tailwind CSS", icon: <TailwindIcon /> },
  { name: "Framer Motion", icon: <Boxes className="w-6 h-6 text-pink-500" /> },
  { name: "Supabase", icon: <Database className="w-6 h-6 text-emerald-500" /> },
  { name: "Node.js", icon: <Server className="w-6 h-6 text-green-600" /> },
  { name: "GitHub", icon: <Github className="w-6 h-6" /> },
];

const TechMarquee = () => {
  return (
    <section className="bg-[#0b0f14] py-8 border-y border-white/5 relative z-20 overflow-hidden">
      {/* Gradient masks for smooth fade in/out */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#0b0f14] to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#0b0f14] to-transparent z-10" />

      <div className="flex overflow-hidden max-w-[100vw] select-none group">
        {/* We need two sets of items to create the infinite loop illusion */}
        <div className="flex gap-16 min-w-full flex-shrink-0 animate-marquee group-hover:[animation-play-state:paused] items-center justify-around px-8">
          {techStack.map((tech, index) => (
            <div key={index} className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
              <span className="grayscale hover:grayscale-0 transition-all duration-300 scale-110">
                {tech.icon}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider opacity-70 hidden md:block">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
        
        {/* Duplicate Set */}
        <div aria-hidden="true" className="flex gap-16 min-w-full flex-shrink-0 animate-marquee group-hover:[animation-play-state:paused] items-center justify-around px-8">
          {techStack.map((tech, index) => (
            <div key={index + "_dup"} className="flex items-center gap-3 text-gray-500 hover:text-white transition-colors">
              <span className="grayscale hover:grayscale-0 transition-all duration-300 scale-110">
                {tech.icon}
              </span>
              <span className="text-sm font-semibold uppercase tracking-wider opacity-70 hidden md:block">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Define Custom Animation in a style tag for simplicity */}
      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TechMarquee;