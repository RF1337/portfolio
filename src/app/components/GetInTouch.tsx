"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function ShuffleButton() {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const span = button.querySelector("span");
    if (!span) return;

    // Build timeline ONCE
    const tl = gsap.timeline({ paused: true });

    tl.to(span, { duration: 0.1, yPercent: -100, ease: "power4.in" })
      .set(span, { yPercent: 150 })
      .to(span, { duration: 0.1, yPercent: 0 });

    tlRef.current = tl;

    const onEnter = () => tl.play(0);
    const onLeave = () => tl.reverse();

    button.addEventListener("mouseenter", onEnter);
    button.addEventListener("mouseleave", onLeave);

    return () => {
      button.removeEventListener("mouseenter", onEnter);
      button.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={buttonRef}
      href="mailto:rasmusferst@gmail.com"
      className="
        inline-grid border bg-white rounded-full 
        px-6 py-3 text-center text-black overflow-hidden
        text-lg font-semibold cursor-pointer
      "
    >
      <span className="block font-bold text-xl">Get in touch</span>
    </a>
  );
}
