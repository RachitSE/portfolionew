"use client";

import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Projects from "./components/projects/Projects";
import CardNav from "./components/ui/CardNav";
import Services from "./components/services/Services";
import Contact from "./components/contact/Contact";
import Timeline from "./components/about/Timeline";
import TechMarquee from "./components/ui/TechMarquee";
import FAQ from "./components/ui/FAQ";
import VelocityScroll from "./components/ui/VelocityScroll";

export default function Home() {
  // Configuration for the Card Nav
const navItems = [
  {
    label: "Navigation",
    links: [
      { label: "Home", href: "/", ariaLabel: "Go Home" },
      { label: "Work", href: "/#projects", ariaLabel: "View Projects" },
      { label: "About", href: "/#about", ariaLabel: "About Me" },
    ]
  },
  {
    label: "Tools",
    links: [
      { label: "Ask AI", href: "/ask-ai", ariaLabel: "AI Chat" },
      { label: "Snippets", href: "/snippets", ariaLabel: "Code Vault" },
      { label: "Estimate", href: "/estimate", ariaLabel: "Pricing" },
      { label: "Uses", href: "/uses", ariaLabel: "Tech Stack" },
      { label: "AI Architect", href: "/pitch", ariaLabel: "AI Architect" },
      { label: "Site Audit", href: "/scanner", ariaLabel: "Website Auditor" },
      { label: "Architecture Preview", href: "/architecture", ariaLabel: "Architecture Preview" },
      { label: "Device Lab", href: "/device-lab", ariaLabel: "Device Lab" }


    ]
  },
  {
    label: "Socials",
    links: [
      { label: "GitHub", href: "https://github.com/rachitse", ariaLabel: "GitHub" },
      { label: "Twitter", href: "#", ariaLabel: "Twitter" },
      { label: "Email", href: "mailto:rachit@example.com", ariaLabel: "Email" },
    ]
  }
];

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-between bg-[#0b0f14] overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-white/[0.05]" />
       {/* Navigation at the top */}
       <div className="absolute top-0 left-0 w-full z-50 pt-6 flex justify-center">
<CardNav items={navItems} logoText="RACHIT" />       </div>

       {/* Add IDs to sections so the links work */}
       <section id="hero" className="w-full">
         <Hero />
       </section>
       <TechMarquee />
       <section id="about" className="w-full">
         <About />
       </section>
       <section id="timeline" className="w-full">
          <Timeline />
        </section>
        <VelocityScroll />
       
       <section id="projects" className="w-full">
         <Projects />
       </section>
        <section id="services" className="w-full">
          <Services />
        </section>
        <FAQ />
        <section id="contact" className="w-full">
          <Contact />
        </section>
    </main>
  );
}