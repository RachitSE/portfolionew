"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface ParallaxProps {
  children: string;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${Math.floor(v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax overflow-hidden flex flex-nowrap letter-spacing-[-2px] leading-[0.8] whitespace-nowrap m-0">
      <motion.div className="scroller font-black uppercase text-7xl md:text-9xl flex whitespace-nowrap flex-nowrap gap-10" style={{ x }}>
        <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 opacity-40 hover:opacity-100 transition-opacity duration-500">{children} </span>
        <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 opacity-40 hover:opacity-100 transition-opacity duration-500">{children} </span>
        <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 opacity-40 hover:opacity-100 transition-opacity duration-500">{children} </span>
        <span className="block mr-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 opacity-40 hover:opacity-100 transition-opacity duration-500">{children} </span>
      </motion.div>
    </div>
  );
}

export default function VelocityScroll() {
  return (
    <section className="py-20 border-y border-white/5 bg-[#0b0f14] relative z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-transparent to-[#0b0f14] z-20 pointer-events-none" />
      <ParallaxText baseVelocity={-2}>PREMIUM WEB DEVELOPMENT •</ParallaxText>
      <div className="mt-4">
        <ParallaxText baseVelocity={2}>NEXT.JS • REACT • TAILWIND •</ParallaxText>
      </div>
    </section>
  );
}