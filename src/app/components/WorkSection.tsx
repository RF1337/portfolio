"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Project {
  title: string;
  year: string;
  link: string;
  imgSrc: string;
  tech: string[];
}

const projects: Project[] = [
  {
    title: "Vordingborg Bycentrum | Booth Reservation",
    year: "2024",
    link: "https://booking.bycentrum.dk/",
    imgSrc: "/assets/projects/booking-project.webp",
    tech: ["Angular", "JSON", "Figma", "UI", "UX"],
  },
  {
    title: "Fitness App | Macrolifter - Diet & Gym",
    year: "2025",
    link: "/projects/fitness-app",
    imgSrc: "/assets/projects/fitness-app-project.webp",
    tech: ["React Native", "Expo", "Supabase", "RevenueCat", "Figma", "UI", "UX"],
  },
  // add more projects here
];

export default function WorkSection() {
  // Array of refs, one per project
  const trackRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    trackRefs.current.forEach((track) => {
      if (!track) return;

      // duplicate content for seamless scroll
      track.innerHTML += track.innerHTML;
      const width = track.scrollWidth / 2;

      
        const pixelsPerSecond = 25; // adjust speed
        const duration = width / pixelsPerSecond;

      gsap.to(track, {
        x: -width,
        duration,
        ease: "linear",
        repeat: -1,
      });
    });
  }, []);

  return (
    <section id="work" className="px-8">
      <h1 className="text-[clamp(32px,5vw,96px)] mb-8 leading-none">Work</h1>

      <div className="projects flex flex-col gap-12">
        {projects.map((project, index) => (
          <div key={index} className="project-card overflow-hidden">
            <a href={project.link} className="block overflow-hidden rounded-sm">
              <img
                src={project.imgSrc}
                alt={project.title}
                draggable={false}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-in-out hover:scale-105"
              />
            </a>

            <div className="pt-2">
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-[clamp(14px,3vw,24px)]">{project.title}</p>
                <p className="font-semibold text-[clamp(14px,3vw,24px)]">{project.year}</p>
              </div>

              <div className="tech-ticker overflow-hidden">
                <div
                  ref={(el) => { trackRefs.current[index] = el; }}
                  className="tech-track inline-flex whitespace-nowrap text-[clamp(11px,3vw,21px)] text-[hsl(0,0%,50%)]"
                >
                  {Array(3)
                    .fill(0)
                    .map((_, repeatIdx) =>
                      project.tech.map((tech, techIdx) => (
                        <span key={`${repeatIdx}-${techIdx}`} className="inline-block">
                          {tech} |&nbsp;
                        </span>
                      ))
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
