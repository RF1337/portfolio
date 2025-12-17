import { projects } from "@/app/data/projects"
import ProjectCard from "../components/ui/ProjectCard"

export default function WorkPage() {
  return (
    <div className="mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map(project => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  )
}
