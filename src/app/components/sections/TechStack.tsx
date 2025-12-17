"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TechStackSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const highlight = highlightRef.current;
    if (!grid || !highlight) return;

    const tiles = grid.querySelectorAll<HTMLAnchorElement>(".tech-tile");

    tiles.forEach((tile) => {
      tile.addEventListener("mouseenter", () => {
        const rect = tile.getBoundingClientRect();
        const gridRect = grid.getBoundingClientRect();

        gsap.to(highlight, {
          opacity: 1,
          x: rect.left - gridRect.left + 1,
          y: rect.top - gridRect.top + 1,
          width: rect.width - 2,
          height: rect.height - 2,
          duration: 0.4,
          ease: "power3.out",
        });

        gsap.to(tile.querySelector("img"), {
          filter: "invert(1)",
          duration: 0,
        });
      });

      tile.addEventListener("mouseleave", () => {
        gsap.to(tile.querySelector("img"), {
          filter: "invert(0)",
          duration: 0.2,
        });
      });
    });
  }, []);

  return (
    <section id="tech-stack" className="min-h-screen mt-48 relative">
      <h1 className="font-bold mb-12 flex justify-center text-[clamp(28px,6vw,136px)]">
        TECH STACK
      </h1>
      <div id="techGridWrapper" ref={gridRef} className="relative z-0">
        {/* Highlight box */}
        <div
          id="highlight"
          ref={highlightRef}
          className="absolute bg-[#1e1e1e] pointer-events-none opacity-0 transition-all"
          style={{ zIndex: 1 }}
        />

        {/* ROW 1 */}
        <div className="grid grid-cols-2 md:grid-cols-3">
          <a href="https://reactnative.dev/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center md:p-40 p-16 border-b border-r border-neutral-200 cursor-pointer">
            <img
              src="/assets/skills/react-native.svg"
              className="w-20 h-20 object-contain relative z-10"
            />
          </a>

          <a href="https://angular.dev/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center md:p-40 p-16 border-b border-l border-r border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/angular.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>

          <a href="https://supabase.com/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center md:p-40 p-16 border-b border-l border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/supabase.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>
        </div>

        {/* ROW 2 */}
        <div className="grid grid-cols-2 md:grid-cols-7">
          <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center p-16 border-t border-r border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/tailwind.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>

          <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center p-16 border-l border-t border-r border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/typescript.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>

          <a href="https://www.docker.com/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center p-16 border-l border-t border-r border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/docker.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>

          <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center p-16 border-l border-t border-r border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/figma.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>

          <a href="https://docs.microsoft.com/en-us/dotnet/csharp/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center p-16 border-l border-t border-r border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/csharp.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>
          
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center p-16 border-l border-t border-r border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/github.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>

          <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="tech-tile flex justify-center items-center p-16 border-l border-t border-neutral-200 cursor-pointer relative">
            <img src="/assets/skills/nextjs.svg" className="w-20 h-20 object-contain relative z-10" />
          </a>
        </div>
      </div>
    </section>
  );
}