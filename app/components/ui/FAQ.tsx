"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "How long does a project take?",
    answer: "It depends on complexity. A landing page typically takes 1-2 days, while a full web application can take 5-7 days. I provide a detailed timeline before we start."
  },
  {
    question: "Do you offer post-launch support?",
    answer: "Absolutely. Every project includes 2 weeks of free support to ensure everything runs smoothly. I also offer monthly maintenance packages for long-term peace of mind."
  },
  {
    question: "What do I need to provide?",
    answer: "Just your vision! If you have designs (Figma), branding, or text, that's great. If not, I can help guide you through the creative process."
  },
  {
    question: "Why Next.js instead of WordPress?",
    answer: "Performance and Scalability. Next.js sites are significantly faster, more secure, and rank better on Google (SEO) than standard WordPress templates."
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-[#0b0f14] relative z-20">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-xs font-bold tracking-[0.2em] uppercase mb-4 block">
            Common Questions
          </span>
          <h2 className="text-4xl font-bold text-white">
            Everything you need <br />
            <span className="text-gray-500">to know.</span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="flex items-center justify-between w-full p-6 text-left hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-lg font-medium text-white">{faq.question}</span>
                <span className="text-cyan-400">
                  {activeIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;