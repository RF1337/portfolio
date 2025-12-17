"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"
import type { Project } from "@/app/types/projects"

export default function ProjectCard({ project }: { project: Project }) {
  const trackRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!trackRef.current) return

    const track = trackRef.current
    track.innerHTML += track.innerHTML
    const width = track.scrollWidth / 2

    gsap.to(track, {
      x: -width,
      duration: width / 25,
      ease: "linear",
      repeat: -1,
    })
  }, [])

  return (
    <div className="project-card overflow-hidden">
      <Link
        href={`/work/${project.slug}`}
        className="block overflow-hidden rounded-sm"
      >
        <img
          src={project.imgSrc}
          alt={project.title}
          draggable={false}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </Link>

      <div className="pt-2">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-[clamp(14px,3vw,24px)]">
            {project.title}
          </p>
          <p className="font-semibold text-[clamp(14px,3vw,24px)]">
            {project.year}
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            ref={trackRef}
            className="inline-flex whitespace-nowrap text-[clamp(11px,3vw,21px)] text-[hsl(0,0%,50%)]"
          >
            {project.tech.map((tech, i) => (
              <span key={i}>{tech} |&nbsp;</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
