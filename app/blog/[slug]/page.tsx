import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findFirst({
    where: { slug, published: true },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Blog
      </Link>
      
      <article>
        <header className="mb-10">
          {post.imageUrl && (
            <div className="mb-8 overflow-hidden rounded-lg">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full object-cover"
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
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {post.title}
            </h1>
        </header>

        <div className="prose prose-zinc dark:prose-invert max-w-none whitespace-pre-wrap">
            {post.content}
        </div>
      </article>
    </div>
  );
}
