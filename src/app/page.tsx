"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import WorkSection from "./components/WorkSection";
import Header from "./shared/Header";
import Footer from "./shared/Footer";
import AboutSection from "./components/AboutSection";
import SkillsSection from "./components/SkillsSection";
import HeroSection from "./components/HeroSection";
import TechStack from "./components/TechStack";

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
      color: "#121212",
      ease: "none",
      scrollTrigger: {
        trigger: "#tech-stack",
        start: "top 20%",          // when footer starts to become visible
        end: () => document.body.scrollHeight, // ends at bottom of page
        toggleActions: "play reverse play reverse",
      },
    });

    ScrollTrigger.refresh();
  }, [lenis]);

  return (
    <div>
      <ReactLenis root />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <TechStack />
    </div>
  );
}
