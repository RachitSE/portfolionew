"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command as CommandPrimitive } from "cmdk";
import { 
  Calculator, 
  Calendar, 
  CreditCard, 
  Settings, 
  Smile, 
  User, 
  Layout, 
  Code,
  Mail,
  Laptop
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CommandMenu() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  // Toggle with Ctrl+K or Cmd+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Action Handler
  const runCommand = React.useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Command Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-white/20 bg-[#0b0f14] shadow-2xl"
          >
            <CommandPrimitive className="h-full w-full">
              
              <div className="flex items-center border-b border-white/10 px-3">
                <CommandPrimitive.Input 
                  placeholder="Type a command or search..." 
                  className="flex h-14 w-full rounded-md bg-transparent py-3 text-lg outline-none placeholder:text-gray-500 text-white"
                />
              </div>

              <CommandPrimitive.List className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
                <CommandPrimitive.Empty className="py-6 text-center text-sm text-gray-500">
                  No results found.
                </CommandPrimitive.Empty>

                <CommandPrimitive.Group heading="Navigation" className="text-xs font-medium text-gray-500 px-2 py-2">
                  <CommandItem onSelect={() => runCommand(() => router.push("/"))}>
                    <Layout className="mr-2 h-4 w-4" />
                    <span>Home</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => router.push("/#projects"))}>
                    <Code className="mr-2 h-4 w-4" />
                    <span>Projects</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => router.push("/estimate"))}>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Project Estimator</span>
                  </CommandItem>
                </CommandPrimitive.Group>

                <CommandPrimitive.Group heading="Actions" className="text-xs font-medium text-gray-500 px-2 py-2 mt-2">
                  <CommandItem onSelect={() => runCommand(() => window.location.href = "mailto:rachitofficial77@gmail.com")}>
                    <Mail className="mr-2 h-4 w-4" />
                    <span>Send Email</span>
                  </CommandItem>
                  <CommandItem onSelect={() => runCommand(() => window.open("https://github.com/rachitse", "_blank"))}>
                    <Laptop className="mr-2 h-4 w-4" />
                    <span>GitHub</span>
                  </CommandItem>
                </CommandPrimitive.Group>

              </CommandPrimitive.List>

              <div className="border-t border-white/10 px-4 py-2 text-[10px] text-gray-500 flex justify-between">
                 <span>Use arrows to navigate</span>
                 <span>ESC to close</span>
              </div>

            </CommandPrimitive>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// Helper Component for consistent styling
function CommandItem({ children, onSelect }: { children: React.ReactNode, onSelect: () => void }) {
  return (
    <CommandPrimitive.Item 
      onSelect={onSelect}
      className="flex cursor-pointer select-none items-center rounded-lg px-3 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white aria-selected:bg-white/10 aria-selected:text-white transition-colors"
    >
      {children}
    </CommandPrimitive.Item>
  )
}