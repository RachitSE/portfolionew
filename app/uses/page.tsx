"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Cpu, Mouse, Keyboard, Laptop, Settings, Copy, Check, PenTool, Database, Globe, Layers , Server } from "lucide-react";
import { motion } from "framer-motion";

// --- DATA: TECH STACK (Complete from Image) ---
const TECH_STACK = [
  {
    category: "Frontend & Frameworks",
    icon: <Globe className="w-5 h-5 text-cyan-400" />,
    items: [
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "Vue.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg" },
      { name: "Angular", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg" },
      { name: "AngularJS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-plain.svg" },
      { name: "jQuery", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg" },
      { name: "Bootstrap", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "React Router", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/reactrouter/reactrouter-original.svg" },
      { name: "Chart.js", icon: "https://www.chartjs.org/img/chartjs-logo.svg" },
      { name: "CanvasJS", icon: "https://canvasjs.com/wp-content/uploads/images/logo/canvasjs-logo-RGB-trans.svg" },
      { name: "Socket.io", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" },
    ]
  },
  {
    category: "Backend & Languages",
    icon: <Server className="w-5 h-5 text-purple-400" />,
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Django", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg" },
      { name: "Flask", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    ]
  },
  {
    category: "Database & Cloud",
    icon: <Database className="w-5 h-5 text-blue-400" />,
    items: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "SQLite", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg" },
      { name: "MariaDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" },
      { name: "Oracle", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/oracle/oracle-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ]
  },
  {
    category: "Mobile & AI/ML",
    icon: <Cpu className="w-5 h-5 text-red-400" />,
    items: [
      { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
      { name: "React Native", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    ]
  },
  {
    category: "Tools & DevOps",
    icon: <Layers className="w-5 h-5 text-yellow-400" />,
    items: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "NGINX", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
      { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Photoshop", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg" },
      { name: "Jest", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg" },
    ]
  }
];

// --- DATA: VS CODE EXTENSIONS ---
const EXTENSIONS = [
  { id: "esbenp.prettier-vscode", name: "Prettier", desc: "Code Formatter" },
  { id: "dbaeumer.vscode-eslint", name: "ESLint", desc: "JS/TS Linter" },
  { id: "bradlc.vscode-tailwindcss", name: "Tailwind CSS", desc: "IntelliSense" },
  { id: "eamodio.gitlens", name: "GitLens", desc: "Supercharge Git" },
  { id: "formulahendry.auto-close-tag", name: "Auto Close Tag", desc: "HTML/XML Utility" },
  { id: "github.copilot", name: "GitHub Copilot", desc: "AI Pair Programmer" },
  { id: "aaron-bond.better-comments", name: "Better Comments", desc: "Colorful Annotations" },
  { id: "vscode-icons-team.vscode-icons", name: "VSCode Icons", desc: "File Icon Theme" },
];

// --- DATA: HARDWARE (Updated) ---
const HARDWARE = [
  { name: "Lenovo ThinkPad", type: "Workstation", icon: <Laptop className="w-6 h-6" /> },
  { name: "Lenovo Legion", type: "Gaming Mouse", icon: <Mouse className="w-6 h-6" /> },
  { name: "Default Keyboard", type: "Keyboard", icon: <Keyboard className="w-6 h-6" /> },
];

export default function UsesPage() {
  const [copied, setCopied] = React.useState(false);

  const copyConfig = () => {
    const config = JSON.stringify(EXTENSIONS.map(e => e.id), null, 2);
    navigator.clipboard.writeText(config);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0b0f14] text-white font-sans selection:bg-cyan-500/30">
      
      {/* Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-cyan-400 transition-colors mb-6 text-sm font-mono">
            <ArrowLeft className="w-4 h-4" /> BACK_TO_BASE
          </Link>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Arsenal.</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
            Software, hardware, and configurations I use to build premium digital products.
          </p>
        </div>

        {/* SECTION 1: THE STACK */}
        <div className="mb-24">
           <h2 className="text-2xl font-bold mb-12 flex items-center gap-3">
             <Layers className="w-6 h-6 text-cyan-400" />
             Full Stack Ecosystem
           </h2>
           
           <div className="space-y-16">
              {TECH_STACK.map((group, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                   <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                     {group.icon}
                     {group.category}
                   </h3>
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {group.items.map((item) => (
                        <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-500/30 transition-all group">
                           <img src={item.icon} alt={item.name} className="w-6 h-6 group-hover:scale-110 transition-transform" />
                           <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.name}</span>
                        </div>
                      ))}
                   </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* SECTION 2: VS CODE SETUP */}
        <div className="mb-24">
           <div className="flex items-center justify-between mb-8">
             <h2 className="text-2xl font-bold flex items-center gap-3">
               <Settings className="w-6 h-6 text-purple-400" />
               Editor Setup
             </h2>
             <button 
               onClick={copyConfig}
               className="flex items-center gap-2 text-xs font-bold px-4 py-2 bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full hover:bg-purple-500/20 transition-all"
             >
               {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
               {copied ? "COPIED JSON" : "COPY CONFIG"}
             </button>
           </div>

           <div className="bg-[#0f111a] border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative group">
              {/* Fake VS Code Header */}
              <div className="bg-[#1a1d26] border-b border-white/5 p-4 flex items-center justify-between">
                 <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                 </div>
                 <div className="text-xs text-gray-500 font-mono">settings.json</div>
                 <div className="w-10" />
              </div>

              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                 {/* Visualizer */}
                 <div className="font-mono text-sm space-y-4">
                    <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                       <span>Theme</span>
                       <span className="text-cyan-400">One Dark Pro</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                       <span>Font</span>
                       <span className="text-cyan-400">Fira Code</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                       <span>Terminal</span>
                       <span className="text-cyan-400">Zsh + OhMyZsh</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400 border-b border-white/5 pb-2">
                       <span>Icon Theme</span>
                       <span className="text-cyan-400">Material Icons</span>
                    </div>
                 </div>

                 {/* Extensions List */}
                 <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Extensions</h4>
                    <div className="grid grid-cols-1 gap-2">
                       {EXTENSIONS.map(ext => (
                         <div key={ext.id} className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-transparent hover:border-white/10 transition-colors">
                            <span className="text-sm font-medium text-gray-200">{ext.name}</span>
                            <span className="text-[10px] text-gray-500">{ext.desc}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* SECTION 3: HARDWARE */}
        <div>
           <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
             <Monitor className="w-6 h-6 text-green-400" />
             Battle Station
           </h2>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HARDWARE.map((item, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -5 }}
                   className="bg-gradient-to-br from-white/5 to-transparent border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center gap-4 group"
                 >
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-cyan-500/20 group-hover:scale-110 transition-all">
                       {item.icon}
                    </div>
                    <div>
                       <div className="font-bold text-sm text-white">{item.name}</div>
                       <div className="text-xs text-gray-500 mt-1">{item.type}</div>
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

      </div>
    </main>
  );
}