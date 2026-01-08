"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, BrainCircuit } from "lucide-react";

// Particle Class for the Neural Net
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.size = Math.random() * 2 + 1;
  }

  update(speedMultiplier: number) {
    this.x += this.vx * speedMultiplier;
    this.y += this.vy * speedMultiplier;

    // Bounce off walls
    if (this.x < 0 || this.x > this.canvasWidth) this.vx *= -1;
    if (this.y < 0 || this.y > this.canvasHeight) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D, color: string) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
}

export default function AIBrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("Ask me anything about Rachit...");
  const [status, setStatus] = useState<"idle" | "thinking" | "speaking">("idle");
  const particles = useRef<Particle[]>([]);

  // 1. Handle the Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Resize
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Init Particles
    const particleCount = 60; // Adjust for density
    particles.current = Array.from({ length: particleCount }, () => new Particle(canvas.width, canvas.height));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Dynamic settings based on status
      let speed = 1;
      let color = "rgba(255, 255, 255, 0.5)";
      let connectionColor = "rgba(255, 255, 255, 0.05)";
      let maxDistance = 100;

      if (status === "thinking") {
        speed = 5; // Fast chaos
        color = "rgba(255, 0, 100, 0.8)"; // Reddish pink
        connectionColor = "rgba(255, 0, 100, 0.2)";
        maxDistance = 150;
      } else if (status === "speaking") {
        speed = 0.5; // Slow deliberate
        color = "rgba(34, 211, 238, 0.9)"; // Cyan
        connectionColor = "rgba(34, 211, 238, 0.3)";
        maxDistance = 120;
      }

      // Update & Draw Particles
      particles.current.forEach((p, i) => {
        p.update(speed);
        p.draw(ctx, color);

        // Draw connections (Neural Lines)
        for (let j = i; j < particles.current.length; j++) {
          const dx = p.x - particles.current[j].x;
          const dy = p.y - particles.current[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = connectionColor;
            ctx.lineWidth = 1;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles.current[j].x, particles.current[j].y);
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [status]);

  // 2. Handle Chat Logic
  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setStatus("thinking");
    setResponse(""); // Clear previous

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });
      const data = await res.json();
      
      setStatus("speaking");
      setResponse(data.reply);
      setQuery("");
      
      // Go back to idle after 10 seconds
      setTimeout(() => setStatus("idle"), 10000);
      
    } catch (err) {
      setResponse("My neural link is broken. Try again later.");
      setStatus("idle");
    }
  };

  return (
    <section className="relative w-full py-20 bg-[#0b0f14] overflow-hidden">
      
      {/* Container */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: Text & Chat */}
        <div>
           <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
             <BrainCircuit className="w-4 h-4" /> Neural Interface
           </span>
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
             Ask my <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">AI Twin.</span>
           </h2>
           <p className="text-gray-400 mb-8">
             I trained this AI on my resume and projects. It knows everything about my stack, pricing, and availability. Go ahead, test it.
           </p>

           {/* Chat Box */}
           <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden">
              {/* AI Response Area */}
              <div className="min-h-[100px] mb-6 text-gray-200 leading-relaxed font-mono text-sm">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={response} // Animates when text changes
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {status === "thinking" ? (
                      <span className="animate-pulse text-purple-400">Analyzing resume database...</span>
                    ) : (
                      response
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Input Form */}
              <form onSubmit={handleAsk} className="relative">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="e.g., What tech stack does Rachit use?"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button 
                  type="submit"
                  disabled={status === "thinking"}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
           </div>
        </div>

        {/* RIGHT: The Brain Canvas */}
        <div className="relative h-[400px] w-full bg-black/20 rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
           <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
           
           {/* Center Icon */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className={`w-20 h-20 rounded-full blur-2xl transition-colors duration-500 ${status === "thinking" ? "bg-purple-500/50" : "bg-cyan-500/20"}`} />
           </div>
        </div>

      </div>
    </section>
  );
}