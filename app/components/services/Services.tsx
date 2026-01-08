"use client";

import React from "react";
import { motion } from "framer-motion";
import { Palette, Laptop, Rocket, CheckCircle2 } from "lucide-react";

const services = [
  {
    icon: <Palette className="w-8 h-8 text-cyan-400" />,
    title: "Brand Websites",
    description: "Perfect for companies needing a premium digital presence. I build sites that tell your story and convert visitors.",
    features: ["Custom UI/UX Design", "Interactive Animations", "Mobile Responsive", "CMS Integration"],
    gradient: "from-cyan-500/10 to-blue-500/10",
    border: "group-hover:border-cyan-500/50"
  },
  {
    icon: <Laptop className="w-8 h-8 text-purple-400" />,
    title: "Web Applications",
    description: "Complex functionality made simple. I build dashboards, SaaS platforms, and internal tools using Next.js.",
    features: ["Authentication & Database", "Real-time Features", "API Integration", "Scalable Architecture"],
    gradient: "from-purple-500/10 to-pink-500/10",
    border: "group-hover:border-purple-500/50"
  },
  {
    icon: <Rocket className="w-8 h-8 text-orange-400" />,
    title: "Performance & SEO",
    description: "Already have a site? I'll optimize it to load under 1 second and rank higher on Google.",
    features: ["100/100 Lighthouse Score", "SEO Optimization", "Code Refactoring", "Core Web Vitals Fix"],
    gradient: "from-orange-500/10 to-yellow-500/10",
    border: "group-hover:border-orange-500/50"
  }
];

const Services = () => {
  return (
    <section className="py-32 bg-[#0b0f14] relative z-20">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            What I Offer
          </span>
          <h2 className="text-4xl font-bold text-white mb-6">
            Scalable solutions for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">every stage of growth.</span>
          </h2>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] hover:bg-white/[0.04] transition-all duration-300 ${service.border} relative overflow-hidden`}
            >
              {/* Background Gradient Blob */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.gradient} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full -mr-10 -mt-10`} />

              <div className="relative z-10">
                <div className="mb-6 p-3 bg-white/5 rounded-xl w-fit border border-white/5">
                  {service.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-8 min-h-[60px]">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;