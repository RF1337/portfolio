import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);

  if (!project) return notFound();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-semibold mb-6">{project.title}</h1>
      <img src={project.imgSrc} alt={project.title} className="w-full object-cover rounded-lg mb-6" />
      <p className="text-gray-700">{project.tech.join(", ")}</p>
    </div>
  );
}