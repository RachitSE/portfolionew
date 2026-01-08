export const projects = [
  {
    slug: "moboflix",
    title: "MOBOFLIX",
    tagline: "Hyper-Local Service Orchestration",
    category: "Service Platform",
    challenge: "The unorganized mobile repair market suffers from a massive trust deficit and logistical opacity. Coordinating real-time schedules between 50+ roving technicians and thousands of distressed users created a complex 'Many-to-Many' synchronization problem. Latency in location tracking resulted in failed bookings.",
    solution: "Engineered a geospatial matching engine using MongoDB geospatial queries to assign the nearest available technician within 200ms. Implemented a robust 3-way handshake authentication flow (User-Technician-Admin) and a finite state machine to handle order statuses (Booked -> En Route -> Repairing -> Completed) without race conditions.",
    description: "A robust home mobile repairing platform. Features real-time service booking, technician management, and a seamless user experience.",
    stack: ["React", "Node.js", "MongoDB", "Leaflet Maps", "Socket.io"],
    gradientFrom: "from-cyan-500/20",
    gradientTo: "to-blue-600/20",
    hoverText: "group-hover:from-cyan-300 group-hover:to-blue-400",
    links: { demo: "https://moboflix.vercel.app/", code: "#" },
    metrics: [
      { label: "Technicians Onboarded", value: "50+" },
      { label: "Avg Booking Time", value: "1.2m" },
      { label: "System Uptime", value: "99.9%" }
    ],
    image: "" 
  },
  {
    slug: "capital",
    title: "CAPITAL",
    tagline: "Institutional-Grade Asset Dashboard",
    category: "Fintech Dashboard",
    challenge: "Retail investors are overwhelmed by complex financial data. The challenge was to render 50,000+ data points (stock ticks, historical candles) in the browser without dropping frames, while simultaneously maintaining a 'Premium' aesthetic that builds trust. Standard charting libraries were too heavy and ugly.",
    solution: "Developed a custom high-performance rendering layer using Recharts with data decimation algorithms to handle heavy loads. Implemented a physics-based 'Tilt' interaction model using React Spring to give digital cards a tactile, premium feel. Global state is managed via Zustand to prevent unnecessary re-renders during high-frequency price updates.",
    description: "High-performance asset management interface. Features real-time stock visualization, tilt-card physics, and transaction ledgers.",
    stack: ["Next.js", "TypeScript", "Zustand", "Recharts", "Tailwind"],
    gradientFrom: "from-emerald-500/20",
    gradientTo: "to-teal-600/20",
    hoverText: "group-hover:from-emerald-300 group-hover:to-teal-400",
    links: { demo: "https://capital-hazel.vercel.app/portfolio", code: "#" },
    metrics: [
      { label: "Render Latency", value: "<16ms" },
      { label: "Assets Tracked", value: "$1.2M" },
      { label: "Lighthouse Score", value: "100" }
    ],
    image: ""
  },
  {
    slug: "aether",
    title: "AETHER",
    tagline: "Sensory E-Commerce Experience",
    category: "E-Commerce",
    challenge: "Selling premium coffee online is difficult because users cannot smell or taste the product. The challenge was to translate sensory details (aroma, warmth, texture) into a digital interface. Traditional grid-based e-commerce layouts felt too cold and transactional for an artisanal brand.",
    solution: "Architected a 'Sensory Web' experience using fluid page transitions and warm, amber-toned glassmorphism. Utilized Framer Motion for micro-interactions—like the product image 'floating' into the cart. Optimized image delivery formats (AVIF/WebP) to ensure 4K visual fidelity without compromising load speeds on mobile devices.",
    description: "A premium digital storefront for artisanal coffee. Focuses on sensory web design, fluid page transitions, and brand aesthetics.",
    stack: ["Next.js", "Framer Motion", "Stripe API", "Zustand"],
    gradientFrom: "from-amber-500/20",
    gradientTo: "to-orange-600/20",
    hoverText: "group-hover:from-amber-300 group-hover:to-orange-400",
    links: { demo: "https://aether-opal.vercel.app/", code: "#" },
    metrics: [
      { label: "Conversion Rate", value: "4.2%" },
      { label: "Cart Abandonment", value: "-15%" },
      { label: "Visual Fidelity", value: "Ultra" }
    ],
    image: ""
  },
  {
    slug: "calibre",
    title: "CALIBRE '25",
    tagline: "Orchestrating High-Traffic Chaos",
    category: "Event Tech",
    challenge: "University fests face massive traffic spikes (10k+ requests) in short bursts when schedules are released. The previous year's site crashed under load. We needed a system that could stay live under extreme concurrency with zero downtime.",
    solution: "Deployed a serverless architecture on Vercel Edge Networks with aggressive 'Stale-While-Revalidate' caching strategies. The frontend logic was decoupled from the CMS to ensure that even if the backend slowed down, the user interface remained responsive (Optimistic UI).",
    description: "The official digital platform for Calibre 2025. Handles high-traffic information dissemination and event schedules.",
    stack: ["Next.js", "Vercel Analytics", "Edge Functions", "Redis"],
    gradientFrom: "from-purple-500/20",
    gradientTo: "to-pink-600/20",
    hoverText: "group-hover:from-purple-300 group-hover:to-pink-400",
    links: { demo: "https://calibre25.vercel.app/", code: "https://github.com/rachitse" },
    metrics: [
      { label: "Peak Traffic", value: "5k/hr" },
      { label: "Page Load", value: "0.8s" },
      { label: "Registrations", value: "800+" }
    ],
    image: ""
  },
  {
    slug: "jaago",
    title: "JAAGO",
    tagline: "Digital Voice for the Voiceless",
    category: "Non-Profit",
    challenge: "NGO websites often suffer from 'Information Overload' and poor accessibility, leading to high bounce rates. The goal was to drive donations and volunteer signups from users on varied devices (from high-end iPhones to budget Androids on 3G).",
    solution: "Adopted a 'Story-First' design philosophy with large typography and high-contrast accessibility (WCAG AA compliant). The donation flow was streamlined to 2 clicks using Razorpay integration. The entire bundle size was kept under 150kb to ensure instant loading in rural areas.",
    description: "A high-impact digital presence for a social cause. Focused on accessibility and clear information architecture.",
    stack: ["React", "Razorpay", "AOS Animation", "Tailwind"],
    gradientFrom: "from-rose-500/20",
    gradientTo: "to-red-600/20",
    hoverText: "group-hover:from-rose-300 group-hover:to-red-400",
    links: { demo: "https://jaago.vercel.app/", code: "#" },
    metrics: [
      { label: "Funds Raised", value: "₹2L+" },
      { label: "Volunteers", value: "120" },
      { label: "Performance", value: "98/100" }
    ],
    image: ""
  }
];