"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function RollingText() {
  const ref = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !ref.current) return;

    const split = new SplitText(ref.current, { type: "chars" });

    const tl = gsap.timeline({ paused: true });
    const repeatCount = 6;

    split.chars.forEach((char, i) => {
      const el = char as HTMLElement;
      const txt = el.innerText;

      // Add original + clone
      el.innerHTML = `
        <div class="originalText">${txt}</div>
        <div class="cloneText">${txt}</div>
      `;

      const original = el.children[0] as HTMLElement;
      const clone = el.children[1] as HTMLElement;

      gsap.set(clone, { yPercent: i % 2 === 0 ? -100 : 100 });

      const tween = gsap.to([original, clone], {
        yPercent: i % 2 === 0 ? "+=100" : "-=100",
        repeat: repeatCount,
        ease: "none"
      });

      tl.add(tween, 0);
    });

    gsap.to(tl, { progress: 1, duration: 4, ease: "power4.inOut" });

    return () => split.revert();
  }, [mounted]);

  return (
    <div className="stage">
      {mounted && (
        <h1 ref={ref} className="rolling-text">
          ROLLING
        </h1>
      )}
    </div>
  );
}
