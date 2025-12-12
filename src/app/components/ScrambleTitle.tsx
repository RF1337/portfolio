"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function ScrambleText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 🟩 Inject the text ONLY on the client
    containerRef.current.innerHTML = "MODERN TECH STACK";

    // 🟩 Now Split the injected text
    const split = new SplitText(containerRef.current, { type: "chars" });

    gsap.fromTo(
      split.chars,
      {
        y: () => gsap.utils.random(-150, 150),
        rotate: () => gsap.utils.random(-25, 25),
        opacity: 0,
      },
      {
        y: 0,
        rotate: 0,
        opacity: 1,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: true,
        },
      }
    );

    // NO REVERT — React must never try to restore original text
    return () => {};
  }, []);

  return (
    <div
      ref={containerRef}
      className="text-[clamp(40px,10vw,160px)] font-black uppercase leading-none"
    >
      {/* ❌ DO NOT put text here. Must be empty for hydration! */}
    </div>
  );
}
