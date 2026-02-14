import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Plus, Pencil, Trash } from "lucide-react";
import { unstable_noStore as noStore } from 'next/cache';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminPostsPage() {
  noStore();
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
        <Link
          href="/admin/posts/create"
          className="flex items-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
        <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
          <thead className="bg-zinc-50 dark:bg-zinc-900">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
              >
                Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-black">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-zinc-900 dark:text-white">
                    {post.title}
                  </div>
                  <div className="text-sm text-zinc-500 dark:text-zinc-400">
                    {post.slug}
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      post.published
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {post.createdAt.toLocaleDateString()}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/posts/${post.id}`}
                      className="text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                    {/* Delete button would need to be a client component or form action */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Debug Section - Only visible in Admin */}
      <div className="mt-12 p-4 border-2 border-dashed border-yellow-500 rounded bg-yellow-50 dark:bg-yellow-900/20">
        <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">🔧 Debug Info (Database Raw View)</h3>
        <p className="text-xs font-mono mb-2">Total Posts Found: {posts.length}</p>
        <div className="space-y-1">
          {posts.map(p => (
            <div key={p.id} className="text-xs font-mono text-zinc-600 dark:text-zinc-400 border-b border-yellow-200 py-1">
              [ID: {p.id}] [Slug: {p.slug}] [Title: {p.title}] [Published: {String(p.published)}] [Image: {p.imageUrl ? 'Yes' : 'No'}]
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
