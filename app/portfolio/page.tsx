import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Portfolio() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Portfolio
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          A selection of my recent work in design and development.
        </p>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            href={project.link || "#"}
            key={project.id}
            className="group block"
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              {project.imageUrl ? (
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full bg-zinc-200 transition-transform duration-500 group-hover:scale-105 dark:bg-zinc-800" />
              )}
              <div className="absolute right-4 top-4 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {project.category}
              </p>
              <h3 className="mt-1 text-xl font-semibold group-hover:underline">
                {project.title}
              </h3>
              <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
        {projects.length === 0 && (
          <p className="col-span-full text-center text-zinc-500">
            No projects found.
          </p>
        )}
      </div>
    </div>
  );
}
