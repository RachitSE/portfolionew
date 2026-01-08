"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import "./CardNav.css";
import Link from "next/link"; // Use Next.js Link

type CardNavLink = {
  label: string;
  href: string;
  ariaLabel: string;
};

export type CardNavItem = {
  label: string;
  // Colors are handled via CSS classes now for better theme support, 
  // but we keep these props to avoid breaking existing interfaces
  bgColor?: string; 
  textColor?: string;
  links: CardNavLink[];
};

export interface CardNavProps {
  logo?: string; // Optional image logo
  logoText?: string; // Optional text logo (better for dev portfolios)
  items: CardNavItem[];
  className?: string;
}

const CardNav: React.FC<CardNavProps> = ({
  logo,
  logoText = "Rachit.",
  items,
  className = "",
}) => {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Height Calculation logic
const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 300; // Fallback

    const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement;
    if (contentEl) {
      // 1. Snapshot current styles
      const originalStyles = {
        visibility: contentEl.style.visibility,
        position: contentEl.style.position,
        height: contentEl.style.height,
        display: contentEl.style.display,
      };

      // 2. Force layout to measure true height
      // We make it invisible but "exist" in the DOM to measure it
      contentEl.style.visibility = "hidden";
      contentEl.style.display = "flex"; 
      contentEl.style.position = "absolute";
      contentEl.style.height = "auto";

      // 3. Measure the actual height of the inner content
      const contentHeight = contentEl.scrollHeight;

      // 4. Restore original styles so we don't break the UI
      Object.assign(contentEl.style, originalStyles);

      // 5. Return dynamic height
      // 60px (Top Bar) + contentHeight + 24px (Bottom Padding)
      return 60 + contentHeight + 24;
    }
    
    return 300;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    // Reset initial states
    gsap.set(cardsRef.current, { y: 20, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.5,
      ease: "power3.inOut",
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", stagger: 0.05 },
      "-=0.2"
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;
    return () => {
      tl?.kill();
    };
  }, [items]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play();
    } else {
      setIsHamburgerOpen(false);
      tl.reverse().then(() => setIsExpanded(false));
    }
  };

  return (
    <div className={`card-nav-container ${className}`}>
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
      >
        <div className="card-nav-top">
          {/* Hamburger */}
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          {/* Logo (Text or Image) */}
          <div className="logo-container">
            {logo ? <img src={logo} alt="Logo" className="logo" /> : <span>{logoText}</span>}
          </div>

          {/* CTA Button */}
          <Link href="/ask-ai">
            <button className="card-nav-cta-button">
              Ask AI <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Expandable Content */}
        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {(items || []).map((item, idx) => (
            <div
              key={idx}
              className="nav-card"
              ref={(el) => { if (el) cardsRef.current[idx] = el; }}
            >
              <div className="nav-card-label">{item.label}</div>
              <div className="nav-card-links">
                {item.links?.map((lnk, i) => (
                  <Link
                    key={i}
                    href={lnk.href}
                    className="nav-card-link"
                    onClick={() => {
                        // Optional: Close menu on link click
                        toggleMenu();
                    }}
                  >
                    {lnk.label}
                    <ArrowUpRight className="nav-card-link-icon" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default CardNav;