import SplitText from "../AnimatedText"
import { projects } from "@/app/data/projects"
import ProjectCard from "../ui/ProjectCard"
import Link from "next/link"

export default function WorkSection() {
  return (
    <section id="work" className="px-2 sm:px-4 md:px-8">
      <SplitText
        text="Work"
        className="text-[clamp(32px,5vw,96px)] md:mb-4 leading-tight"
        type="lines"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mx-auto">
        {projects.slice(0, 2).map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      <Link
        href="/work"
        className="inline-block mt-12 text-lg opacity-80 hover:opacity-100 transition"
      >
        See all →
      </Link>
    </section>
  )
}
