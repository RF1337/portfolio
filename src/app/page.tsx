"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import WorkSection from "./components/sections/Work";
import AboutSection from "./components/sections/About";
import SkillsSection from "./components/sections/Skills";
import HeroSection from "./components/sections/Hero";
import TechStack from "./components/sections/TechStack";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  // lenis smooth scroll
  const lenis = useLenis((lenis) => {});

  useEffect(() => {
    if (!lenis) return;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy(document.body, {
  scrollTop(value) {
    // SET (ScrollTrigger is telling Lenis to scroll)
    if (typeof value === "number") {
      lenis.scrollTo(value);
    }

    // GET (ScrollTrigger wants the current scroll position)
    return lenis.scroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
});


    // Background color animation when footer comes into view
    gsap.to("body", {
      backgroundColor: "#ffffff",  // light mode
      color: "#1B1D1D",
      ease: "none",
      scrollTrigger: {
        trigger: "#skills",
        start: "top 20%",          // when footer starts to become visible
        end: () => document.body.scrollHeight, // ends at bottom of page
        toggleActions: "play reverse play reverse",
      },
    });

    ScrollTrigger.refresh();
  }, [lenis]);

  return (
    <div>
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <SkillsSection />
      <TechStack />
    </div>
  );
}
