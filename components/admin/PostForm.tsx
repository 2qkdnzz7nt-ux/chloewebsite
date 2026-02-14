"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PostForm({ post }: { post?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      slug: formData.get("slug"),
      excerpt: formData.get("excerpt"),
      content: formData.get("content"),
      category: formData.get("category"),
      imageUrl: formData.get("imageUrl"),
      published: formData.get("published") === "on",
    };

    try {
      let response;
      if (post) {
        response = await fetch(`/api/posts/${post.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        response = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      
      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        const errorMessage = err.details || err.error || "Failed to save post";
        
        if (errorMessage.includes("Unique constraint failed")) {
          throw new Error("Slug already exists. Please use a different Slug.");
        }
        
        throw new Error(errorMessage);
      }
      
      alert("Post saved successfully!");
      // Force a full page reload to ensure data is fresh
      window.location.href = "/admin/posts";
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Failed to save post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Title
        </label>
        <input
          name="title"
          defaultValue={post?.title}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Slug
        </label>
        <input
          name="slug"
          defaultValue={post?.slug}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Category
        </label>
        <input
          name="category"
          defaultValue={post?.category}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Image URL
        </label>
        <input
          name="imageUrl"
          defaultValue={post?.imageUrl}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Excerpt
        </label>
        <textarea
          name="excerpt"
          defaultValue={post?.excerpt}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Content
        </label>
        <textarea
          name="content"
          defaultValue={post?.content}
          required
          rows={10}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published}
          className="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black"
        />
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Published
        </label>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {loading ? "Saving..." : "Save Post"}
      </button>
    </form>
  );
}
