import ProjectForm from "@/components/admin/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Edit Project</h1>
      <ProjectForm project={project} />
    </div>
  );
}
