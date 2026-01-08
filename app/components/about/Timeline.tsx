"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Code, Heart } from "lucide-react";

const timelineData = [
  {
    year: "2024-Present",
    title: "Freelance Developer",
    org: "Self-Employed",
    desc: "Building premium web experiences for international clients using Next.js 15 & AI integrations.",
    icon: <Code className="w-5 h-5" />,
    color: "text-cyan-400",
  },
  {
    year: "2023-24",
    title: "Full Stack Contributor",
    org: "Jaago Foundation",
    desc: "Revamped the digital presence for a major NGO. Focused on accessibility and high-performance UI.",
    icon: <Heart className="w-5 h-5" />,
    color: "text-red-400",
  },
  {
    year: "2020-23",
    title: "Hackathons Winner",
    org: "TruVerse / Smart India Hackathons / Local Events",
    desc: "Built web-apps with creative ideas and secured top positions. Started specializing in React & Backend logic.",
    icon: <Briefcase className="w-5 h-5" />,
    color: "text-purple-400",
  },
  {
    year: "2019-20",
    title: "Student Developer",
    org: "University / Self-Taught",
    desc: "Started the journey. Mastered JavaScript, TypeScript and the basics of modern web architecure.",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "text-yellow-400",
  },
];

const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-[#0b0f14] font-sans md:px-10" ref={containerRef}>
      <div className="max-w-4xl mx-auto py-20 px-4 md:px-8 relative">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-white max-w-4xl">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Journey</span> so far.
        </h2>

        {/* The Vertical Line Container */}
        <div className="relative pl-8 md:pl-0">
          
          {/* The Static Line (Gray) */}
          <div className="absolute left-8 md:left-9 top-0 bottom-0 w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"></div>

          {/* The Animated Beam (Glowing) */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute left-8 md:left-9 top-0 w-[2px] bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent rounded-full shadow-[0_0_20px_2px_rgba(34,211,238,0.5)] z-10"
          />

          {/* Timeline Items */}
          <div className="space-y-12">
            {timelineData.map((item, index) => (
              <div key={index} className="flex flex-col md:flex-row gap-8 relative">
                
                {/* The Dot on the Line */}
                <div className="absolute left-8 md:left-9 -translate-x-1/2 mt-1 w-6 h-6 rounded-full border border-neutral-700 bg-[#0b0f14] flex items-center justify-center z-20">
                  <div className="w-2 h-2 rounded-full bg-neutral-400 group-hover:bg-cyan-400 transition-colors" />
                </div>

                {/* Content */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="pl-16 md:pl-24 w-full"
                >
                  <span className={`text-5xl font-bold opacity-10 absolute left-12 md:left-auto md:-ml-24 -mt-4 select-none ${item.color}`}>
                    {item.year}
                  </span>
                  
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                     {item.title}
                  </h3>
                  <p className={`text-sm font-medium mb-2 ${item.color}`}>{item.org}</p>
                  <p className="text-neutral-400 text-sm md:text-base max-w-xl leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;