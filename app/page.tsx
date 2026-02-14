import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const projects = await prisma.project.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 text-center sm:px-6 lg:px-8">
        <h1 className="max-w-4xl text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          DESIGNER <span className="text-zinc-400">&</span> <br />
          DEVELOPER
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
          Crafting digital experiences that blend aesthetics with functionality.
          <br />
          Based in the digital realm, working globally.
        </p>
        <div className="mt-10 flex gap-4">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-transform hover:scale-105 dark:bg-white dark:text-black"
          >
            View Work <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/shop"
            className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-8 py-3 text-sm font-medium text-black transition-transform hover:scale-105 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-black dark:text-white dark:hover:bg-zinc-900"
          >
            Visit Shop
          </Link>
        </div>
      </section>

      {/* Featured Work Preview */}
      <section className="w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Selected Work
          </h2>
          <Link
            href="/portfolio"
            className="text-sm font-medium hover:underline"
          >
            View all projects
          </Link>
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
                <h3 className="text-lg font-medium group-hover:underline">
                  {project.title}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {project.category}
                </p>
              </div>
            </Link>
          ))}
          {projects.length === 0 && (
            <div className="col-span-full py-12 text-center text-zinc-500">
              <p>No projects yet.</p>
              <p className="text-sm">Admin can add projects in the dashboard.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
