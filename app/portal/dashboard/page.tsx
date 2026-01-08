"use client";

import React, { useState, useEffect, useRef, FormEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Kanban, CreditCard, Settings, 
  Bell, Search, LogOut, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, Download, Plus, 
  MessageSquare, FileText, Upload, X, Send, 
  MoreVertical, User, File, Trash2, RefreshCw
} from "lucide-react";

// --- TYPES --- //
type TaskStatus = "todo" | "in-progress" | "review" | "done";
type Task = { id: string; title: string; tag: string; status: TaskStatus; assignee: string; priority: "low" | "med" | "high" };
type Invoice = { id: string; date: string; amount: string; status: "paid" | "pending"; service: string };
type Message = { id: string; sender: "me" | "rachit"; text: string; time: string };
type Doc = { id: string; name: string; size: string; type: string; date: string; progress?: number };
type Activity = { id: string; text: string; time: string; type: "commit" | "design" | "deploy" };

// --- MOCK DATA GENERATORS --- //
const INITIAL_TASKS: Task[] = [
  { id: "t-1", title: "Fix Mobile Navigation", tag: "Frontend", status: "todo", assignee: "Rachit", priority: "high" },
  { id: "t-2", title: "Database Schema Design", tag: "Backend", status: "in-progress", assignee: "Rachit", priority: "high" },
  { id: "t-3", title: "Client Content Review", tag: "Content", status: "review", assignee: "Guest", priority: "med" },
  { id: "t-4", title: "Setup CI/CD Pipeline", tag: "DevOps", status: "done", assignee: "Rachit", priority: "low" },
];

const INITIAL_MESSAGES: Message[] = [
  { id: "m-1", sender: "rachit", text: "Hey! Welcome to the portal. I've uploaded the latest designs.", time: "10:00 AM" },
];

const INITIAL_DOCS: Doc[] = [
  { id: "d-1", name: "Contract_Signed.pdf", size: "2.4 MB", type: "PDF", date: "Oct 24, 2024" },
  { id: "d-2", name: "Brand_Assets.zip", size: "156 MB", type: "ZIP", date: "Nov 02, 2024" },
];

// --- COMPONENTS --- //

// 1. Progress Ring Component
const ProgressRing = ({ radius, stroke, progress }: { radius: number; stroke: number; progress: number }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="rotate-[-90deg]">
        <circle stroke="rgba(255,255,255,0.1)" strokeWidth={stroke} fill="transparent" r={normalizedRadius} cx={radius} cy={radius} />
        <circle 
          stroke="#22d3ee" 
          strokeWidth={stroke} 
          strokeDasharray={circumference + ' ' + circumference} 
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.5s ease-in-out" }} 
          fill="transparent" 
          r={normalizedRadius} 
          cx={radius} 
          cy={radius} 
        />
      </svg>
      <div className="absolute text-xs font-bold text-cyan-400">{progress}%</div>
    </div>
  );
};

// 2. Notification Toast
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => (
  <motion.div 
    initial={{ x: 100, opacity: 0 }} 
    animate={{ x: 0, opacity: 1 }} 
    exit={{ x: 100, opacity: 0 }}
    className="fixed bottom-6 right-6 bg-[#1a1d24] border border-cyan-500/20 p-4 rounded-xl shadow-2xl z-50 flex items-center gap-3 min-w-[300px]"
  >
    <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
      <Bell className="w-4 h-4" />
    </div>
    <div className="flex-grow">
      <div className="text-xs font-bold text-gray-500 uppercase">System Alert</div>
      <div className="text-sm text-white">{message}</div>
    </div>
    <button onClick={onClose} className="text-gray-500 hover:text-white"><X className="w-4 h-4" /></button>
  </motion.div>
);

// --- MAIN PAGE --- //

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "board" | "billing" | "chat" | "files">("overview");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // --- CENTRAL STATE "DATABASE" ---
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [activities, setActivities] = useState<Activity[]>([
    { id: "a1", text: "Deployed v1.0.4 to Production", time: "2m ago", type: "deploy" },
    { id: "a2", text: "Updated Figma components", time: "1h ago", type: "design" },
  ]);

  // Inputs
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // --- SIMULATION EFFECTS --- //

  // 1. Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => { scrollToBottom() }, [messages, isTyping]);

  // 2. Random "Live" Activity Generator
  useEffect(() => {
    const interval = setInterval(() => {
      const randomEvents = [
        "Rachit pushed a commit to main",
        "Automated test suite passed (42/42)",
        "Vercel deployment initialized",
        "Database backup completed",
      ];
      const evt = randomEvents[Math.floor(Math.random() * randomEvents.length)];
      if (Math.random() > 0.7) { // 30% chance every 10s
        addNotification(evt);
        setActivities(prev => [{ id: Date.now().toString(), text: evt, time: "Just now", type: "commit" }, ...prev.slice(0, 4)]);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  // --- ACTIONS --- //

  const addNotification = (msg: string) => {
    setNotifications(prev => [...prev, msg]);
    // Auto clear after 4s
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== msg));
    }, 4000);
  };

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: "me", text: chatInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    // Simulate AI Reply
    setTimeout(() => {
      setIsTyping(false);
      const replies = [
        "Got it! I'll take a look shortly.",
        "Uploading the fix now.",
        "That sounds good. Let me update the ticket.",
        "Thanks for the feedback!",
      ];
      const botMsg: Message = { 
        id: (Date.now() + 1).toString(), 
        sender: "rachit", 
        text: replies[Math.floor(Math.random() * replies.length)], 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      };
      setMessages(prev => [...prev, botMsg]);
      addNotification("New message from Rachit");
    }, 2000);
  };

  const handleAddTask = (e: FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      tag: "General",
      status: "todo",
      assignee: "Guest",
      priority: "med"
    };
    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle("");
    addNotification("Task created successfully");
  };

  const handleMoveTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const handleFileUpload = () => {
    addNotification("Starting secure upload...");
    const newDoc: Doc = { id: Date.now().toString(), name: `Upload_${Math.floor(Math.random()*100)}.png`, size: "2MB", type: "PNG", date: "Just now", progress: 0 };
    setDocs(prev => [newDoc, ...prev]);

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, progress } : d));
      if (progress >= 100) {
        clearInterval(interval);
        addNotification("File uploaded successfully");
        setDocs(prev => prev.map(d => d.id === newDoc.id ? { ...d, progress: undefined } : d));
      }
    }, 200);
  };

  return (
    <main className="h-screen w-full bg-[#050505] text-white font-sans selection:bg-cyan-500/30 flex overflow-hidden">
      
      {/* --- NOTIFICATIONS --- */}
      <div className="z-[100]">
        <AnimatePresence>
          {notifications.map((n, i) => (
            <Toast key={i} message={n} onClose={() => setNotifications(prev => prev.filter((_, idx) => idx !== i))} />
          ))}
        </AnimatePresence>
      </div>

      {/* --- SIDEBAR --- */}
      <motion.aside 
        animate={{ width: sidebarOpen ? 260 : 80 }}
        className="border-r border-white/5 bg-[#080a0f] flex flex-col relative z-20 transition-all duration-300"
      >
         <div className="p-6 flex items-center gap-3 border-b border-white/5 h-20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-black shadow-lg shadow-cyan-500/20 shrink-0">
              R
            </div>
            {sidebarOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="whitespace-nowrap overflow-hidden">
                 <div className="text-sm font-bold">Rachit.Dev</div>
                 <div className="text-[10px] text-gray-500">Premium Workspace</div>
              </motion.div>
            )}
         </div>

         <nav className="flex-grow p-4 space-y-2 overflow-y-auto scrollbar-hide">
            {[
              { id: "overview", label: "Dashboard", icon: <LayoutDashboard /> },
              { id: "board", label: "Tasks & Sprint", icon: <Kanban /> },
              { id: "chat", label: "Messages", icon: <MessageSquare />, badge: messages.length },
              { id: "files", label: "Files & Assets", icon: <FileText /> },
              { id: "billing", label: "Invoices", icon: <CreditCard /> },
            ].map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id as any)}
                 className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                    activeTab === item.id 
                      ? "bg-white/10 text-white shadow-inner" 
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                 }`}
               >
                 <span className={`${activeTab === item.id ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>{item.icon}</span>
                 {sidebarOpen && <span>{item.label}</span>}
                 {sidebarOpen && item.badge && (
                   <span className="absolute right-4 bg-cyan-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                     {item.badge}
                   </span>
                 )}
               </button>
            ))}
         </nav>

         <div className="p-4 border-t border-white/5">
            <Link href="/" className="flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors">
               <LogOut className="w-5 h-5" />
               {sidebarOpen && "Logout"}
            </Link>
         </div>
      </motion.aside>

      {/* --- MAIN AREA --- */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden relative bg-[#050505]">
         {/* Top Bar */}
         <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-[#050505]/80 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
                 <MoreVertical className="w-5 h-5 rotate-90" />
              </button>
              <h2 className="text-lg font-medium capitalize">{activeTab}</h2>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/5">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-xs text-green-400 font-mono">System Operational</span>
               </div>
               <div className="h-8 w-[1px] bg-white/10" />
               <div className="flex items-center gap-3">
                  <div className="text-right hidden md:block">
                     <div className="text-sm font-bold text-white">Guest User</div>
                     <div className="text-[10px] text-gray-500">Client Access</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 border-2 border-white/10 flex items-center justify-center text-xs font-bold">
                     GU
                  </div>
               </div>
            </div>
         </header>

         {/* DYNAMIC CONTENT AREA */}
         <div className="flex-grow overflow-y-auto p-6 md:p-10 scrollbar-hide">
            <AnimatePresence mode="wait">
               
               {/* --- VIEW: OVERVIEW --- */}
               {activeTab === "overview" && (
                 <motion.div 
                   key="overview"
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="space-y-8 max-w-6xl mx-auto"
                 >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                       {[
                         { label: "Sprint Progress", value: "68%", sub: "+12% this week", icon: <Clock /> },
                         { label: "Active Tasks", value: tasks.filter(t => t.status !== "done").length.toString(), sub: "2 High Priority", icon: <Kanban /> },
                         { label: "Unread Msgs", value: "1", sub: "Avg response: 2h", icon: <MessageSquare /> },
                         { label: "Total Spent", value: "$4,000", sub: "Invoice #003 Pending", icon: <CreditCard /> },
                       ].map((stat, i) => (
                         <div key={i} className="bg-[#0f1116] p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                               <div className="p-3 rounded-lg bg-white/5 text-gray-400 group-hover:text-cyan-400 group-hover:bg-cyan-500/10 transition-all">
                                  {stat.icon}
                               </div>
                               <span className="text-xs font-bold bg-green-500/10 text-green-400 px-2 py-1 rounded">Live</span>
                            </div>
                            <div className="text-3xl font-bold mb-1">{stat.value}</div>
                            <div className="text-xs text-gray-500">{stat.label}</div>
                            <div className="text-[10px] text-gray-600 mt-2">{stat.sub}</div>
                         </div>
                       ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                       <div className="lg:col-span-2 bg-[#0f1116] p-8 rounded-3xl border border-white/5">
                          <h3 className="text-lg font-bold mb-6">Activity Feed</h3>
                          <div className="space-y-6">
                             {activities.map((act, i) => (
                               <div key={i} className="flex gap-4 items-start">
                                  <div className="w-8 flex flex-col items-center">
                                     <div className={`w-2 h-2 rounded-full ${act.type === 'deploy' ? 'bg-purple-500' : 'bg-blue-500'}`} />
                                     <div className="w-[1px] h-full bg-white/5 mt-2" />
                                  </div>
                                  <div>
                                     <div className="text-sm text-white">{act.text}</div>
                                     <div className="text-xs text-gray-500">{act.time}</div>
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>

                       <div className="bg-gradient-to-b from-cyan-900/10 to-[#0f1116] p-8 rounded-3xl border border-white/5 flex flex-col items-center justify-center text-center">
                          <ProgressRing radius={80} stroke={10} progress={68} />
                          <h3 className="text-xl font-bold mt-6">Milestone Beta</h3>
                          <p className="text-sm text-gray-400 mt-2 mb-6">Expected launch in 4 days. Critical backend APIs are stable.</p>
                          <button onClick={() => setActiveTab("board")} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors">
                             View Sprint Board
                          </button>
                       </div>
                    </div>
                 </motion.div>
               )}

               {/* --- VIEW: KANBAN --- */}
               {activeTab === "board" && (
                 <motion.div key="board" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                       <h2 className="text-2xl font-bold">Kanban Board</h2>
                       <form onSubmit={handleAddTask} className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="Add quick task..." 
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="bg-[#0f1116] border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-cyan-500 outline-none w-64"
                          />
                          <button type="submit" className="p-2 bg-cyan-500 text-black rounded-lg hover:bg-cyan-400">
                             <Plus className="w-5 h-5" />
                          </button>
                       </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-full overflow-x-auto pb-10">
                       {["todo", "in-progress", "review", "done"].map((col) => (
                         <div key={col} className="bg-[#0f1116]/50 rounded-2xl p-4 flex flex-col min-w-[280px] border border-white/5">
                            <div className="flex justify-between items-center mb-4 px-2">
                               <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{col.replace("-", " ")}</span>
                               <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-gray-400">
                                 {tasks.filter(t => t.status === col).length}
                               </span>
                            </div>
                            <div className="space-y-3 flex-grow overflow-y-auto scrollbar-hide">
                               {tasks.filter(t => t.status === col).map((task) => (
                                  <motion.div 
                                    layoutId={task.id}
                                    className="bg-[#1a1d24] p-4 rounded-xl border border-white/5 hover:border-cyan-500/50 group relative cursor-pointer"
                                    key={task.id}
                                  >
                                     <div className="flex justify-between items-start mb-2">
                                        <span className={`text-[10px] px-2 py-0.5 rounded border ${
                                           task.priority === 'high' ? 'bg-red-500/10 border-red-500/20 text-red-400' : 
                                           task.priority === 'med' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
                                           'bg-blue-500/10 border-blue-500/20 text-blue-400'
                                        }`}>{task.priority}</span>
                                        <button onClick={() => handleDeleteTask(task.id)} className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-500">
                                           <Trash2 className="w-3 h-3" />
                                        </button>
                                     </div>
                                     <h4 className="text-sm font-medium mb-3">{task.title}</h4>
                                     <div className="flex justify-between items-center mt-2">
                                        <div className="text-[10px] text-gray-500">{task.assignee}</div>
                                        {col !== 'done' && (
                                          <button 
                                            onClick={() => handleMoveTask(task.id, col === 'todo' ? 'in-progress' : col === 'in-progress' ? 'review' : 'done')}
                                            className="p-1 hover:bg-white/10 rounded"
                                          >
                                            <ChevronRight className="w-4 h-4 text-gray-500" />
                                          </button>
                                        )}
                                     </div>
                                  </motion.div>
                               ))}
                               {tasks.filter(t => t.status === col).length === 0 && (
                                 <div className="text-center py-10 border-2 border-dashed border-white/5 rounded-xl text-xs text-gray-600">
                                    Empty
                                 </div>
                               )}
                            </div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
               )}

               {/* --- VIEW: CHAT --- */}
               {activeTab === "chat" && (
                 <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-[calc(100vh-140px)] flex flex-col bg-[#0f1116] border border-white/5 rounded-2xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 bg-[#151820] flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 relative">
                             <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#151820] rounded-full" />
                          </div>
                          <div>
                             <div className="text-sm font-bold">Rachit Singh</div>
                             <div className="text-xs text-green-400">Online now</div>
                          </div>
                       </div>
                       <button className="text-gray-500 hover:text-white"><MoreVertical className="w-5 h-5" /></button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#0b0d12]">
                       {messages.map((msg) => (
                          <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                             <div className={`max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed ${
                                msg.sender === "me" 
                                  ? "bg-cyan-600 text-white rounded-tr-none" 
                                  : "bg-[#1a1d24] text-gray-200 border border-white/5 rounded-tl-none"
                             }`}>
                                {msg.text}
                                <div className={`text-[10px] mt-2 opacity-50 ${msg.sender === "me" ? "text-right" : "text-left"}`}>
                                   {msg.time}
                                </div>
                             </div>
                          </div>
                       ))}
                       {isTyping && (
                          <div className="flex justify-start">
                             <div className="bg-[#1a1d24] p-4 rounded-2xl rounded-tl-none border border-white/5 flex gap-1 items-center">
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                             </div>
                          </div>
                       )}
                       <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="p-4 bg-[#151820] border-t border-white/5 flex gap-4">
                       <button type="button" className="p-3 bg-white/5 rounded-xl text-gray-400 hover:text-white"><Plus className="w-5 h-5" /></button>
                       <input 
                         type="text" 
                         value={chatInput}
                         onChange={(e) => setChatInput(e.target.value)}
                         placeholder="Type your message..."
                         className="flex-grow bg-[#0b0d12] border border-white/10 rounded-xl px-4 text-sm focus:border-cyan-500 outline-none"
                       />
                       <button type="submit" className="p-3 bg-cyan-500 text-black rounded-xl font-bold hover:bg-cyan-400 transition-colors">
                          <Send className="w-5 h-5" />
                       </button>
                    </form>
                 </motion.div>
               )}

               {/* --- VIEW: FILES --- */}
               {activeTab === "files" && (
                 <motion.div key="files" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <div className="flex justify-between items-center mb-8">
                       <h2 className="text-2xl font-bold">Project Assets</h2>
                       <button onClick={handleFileUpload} className="px-6 py-2 bg-cyan-500 text-black font-bold rounded-lg flex items-center gap-2 hover:bg-cyan-400">
                          <Upload className="w-4 h-4" /> Upload
                       </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                       {docs.map((doc) => (
                          <div key={doc.id} className="bg-[#0f1116] border border-white/5 rounded-2xl p-6 group hover:border-cyan-500/30 transition-all relative overflow-hidden">
                             {doc.progress !== undefined && (
                               <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 flex-col gap-2">
                                  <div className="text-xs font-bold text-cyan-400">Uploading {doc.progress}%</div>
                                  <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                                     <div className="h-full bg-cyan-500" style={{ width: `${doc.progress}%` }} />
                                  </div>
                               </div>
                             )}
                             <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-4 text-gray-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all">
                                <File className="w-6 h-6" />
                             </div>
                             <div className="text-sm font-bold truncate mb-1">{doc.name}</div>
                             <div className="flex justify-between text-xs text-gray-500">
                                <span>{doc.size}</span>
                                <span>{doc.date}</span>
                             </div>
                          </div>
                       ))}
                    </div>
                 </motion.div>
               )}

            </AnimatePresence>
         </div>
      </div>
    </main>
  );
}