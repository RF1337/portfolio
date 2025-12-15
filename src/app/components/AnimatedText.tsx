// components/AnimatedText.tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { SplitText as GSTSplitText } from "gsap/dist/SplitText";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  text: string;
  type?: "chars" | "words" | "lines";
  className?: string;
  stagger?: number;
};

export default function AnimatedText({ text, type = "chars", className, stagger = 0.05 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const split = new GSTSplitText(ref.current, { type });

    gsap.from(split[type], {
      y: 50,
      opacity: 0,
      stagger,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%", // when the top of the element is 80% from the top of the viewport
        toggleActions: "play none none none", // play only
      },
    });

    return () => split.revert(); // cleanup
  }, [text, type, stagger]);

  return <div ref={ref} className={className}>{text}</div>;
}
