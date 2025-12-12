"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface AnimatedTextProps {
  text: string;
  duration?: number;
  y?: number;
  delay?: number;
  className?: string;
}

export default function AnimatedText({
  text,
  duration = 1,
  y = 20,
  delay = 0.05,
  className = "",
}: AnimatedTextProps) {

  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;

    gsap.from(el.current, {
      opacity: 0,
      y,
      duration,
      delay,
      ease: "power3.out",
    });
  }, []);

  return (
    <span ref={el} className={className}>
      {text}
    </span>
  );
}