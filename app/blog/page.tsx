import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Blog() {
  noStore();
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Thoughts on design, technology, and creativity.
        </p>
      </div>

      <div className="space-y-12">
        {posts.map((post) => (
          <article
            key={post.id}
            className="group border-b border-zinc-200 pb-12 dark:border-zinc-800"
          >
            {post.imageUrl && (
              <div className="mb-6 aspect-video w-full overflow-hidden rounded-lg">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              <time>{post.createdAt.toLocaleDateString()}</time>
              <span>•</span>
              <span className="font-medium text-black dark:text-white">
                {post.category}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold group-hover:underline">
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
              {post.excerpt}
            </p>
            <div className="mt-6">
              <Link
                href={`/blog/${post.slug}`}
                className="text-sm font-medium underline decoration-zinc-400 underline-offset-4 hover:decoration-black dark:decoration-zinc-600 dark:hover:decoration-white"
              >
                Read more
              </Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && (
          <p className="text-center text-zinc-500">No posts found.</p>
        )}
      </div>
    </div>
  );
}
