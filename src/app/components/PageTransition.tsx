"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

// Map routes to display text
const routeNames: Record<string, string> = {
  "/": "Home",
  "/work": "Projects",
  "/about": "About",
  "/contact": "Contact",
};

// Format slug into readable text
function formatSlug(slug: string): string {
  return slug
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let isAnimating = false;

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [displayName, setDisplayName] = useState(routeNames[pathname] || "Page");

  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const content = contentRef.current;

    if (!overlay || !text || !content) return;

    // Animate content in on mount
    gsap.set(overlay, { scaleY: 0, transformOrigin: "top" });
    gsap.set(content, { opacity: 1 });

    // Intercept all link clicks
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      
      if (!link) return;
      
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || isAnimating) return;
      
      // Prevent default navigation
      e.preventDefault();
      isAnimating = true;

      // Update display text
      const slug = href.split("/").pop() || "";
      const newDisplayName = routeNames[href] || (slug ? formatSlug(slug) : "Page");
      setDisplayName(newDisplayName);

      // Animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          router.push(href);
          isAnimating = false;
        }
      });

      // 1. Fade out current content
      tl.to(content, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })
      // 2. Overlay slides down
      .to(overlay, {
        scaleY: 1,
        transformOrigin: "bottom",
        duration: 0.6,
        ease: "power3.inOut",
      }, "-=0.1")
      // 3. Text fades in
      .to(text, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      }, "-=0.3")
      // 4. Text fades out
      .to(text, {
        opacity: 0,
        y: -50,
        duration: 0.3,
        ease: "power2.in",
      }, "+=0.2")
      // 5. Overlay slides up
      .to(overlay, {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.6,
        ease: "power3.inOut",
      }, "-=0.1");
    };

    document.addEventListener("click", handleLinkClick);

    return () => {
      document.removeEventListener("click", handleLinkClick);
    };
  }, [router]);

  // Animate in new content after route change
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    gsap.to(content, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Update display name
    const slug = pathname.split("/").pop() || "";
    setDisplayName(routeNames[pathname] || (slug ? formatSlug(slug) : "Page"));
  }, [pathname]);

  return (
    <>
      {/* Transition Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 pointer-events-none bg-black"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1
            ref={textRef}
            className="text-6xl md:text-8xl font-bold text-white opacity-0"
          >
            {displayName}
          </h1>
        </div>
      </div>

      {/* Page Content */}
      <div ref={contentRef}>
        {children}
      </div>
    </>
  );
}