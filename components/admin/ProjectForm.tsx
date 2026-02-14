"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProjectForm({ project }: { project?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   console.log("Form submitted!"); // Debug log
  //   setLoading(true);

  //   const formData = new FormData(e.currentTarget);
  //   const data = {
  //     title: formData.get("title"),
  //     description: formData.get("description"),
  //     category: formData.get("category"),
  //     imageUrl: formData.get("imageUrl"),
  //     link: formData.get("link"),
  //   };

  async function handleManualSubmit() {
    console.log("Manual submit clicked!");
    setLoading(true);
    
    // Manually gather data since we are not using a form event
    const title = (document.querySelector('input[name="title"]') as HTMLInputElement)?.value;
    const description = (document.querySelector('textarea[name="description"]') as HTMLTextAreaElement)?.value;
    const category = (document.querySelector('input[name="category"]') as HTMLInputElement)?.value;
    const imageUrl = (document.querySelector('input[name="imageUrl"]') as HTMLInputElement)?.value;
    const link = (document.querySelector('input[name="link"]') as HTMLInputElement)?.value;

    const data = { title, description, category, imageUrl, link };

    try {
      if (project) {
        await fetch(`/api/projects/${project.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert(`Failed to save project: ${error}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Inputs remain the same... */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Title
        </label>
        <input
          name="title"
          defaultValue={project?.title}
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
          defaultValue={project?.category}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Description
        </label>
        <textarea
          name="description"
          defaultValue={project?.description}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Image URL
        </label>
        <input
          name="imageUrl"
          defaultValue={project?.imageUrl}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Project Link
        </label>
        <input
          name="link"
          defaultValue={project?.link}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <button
        type="button"
        onClick={handleManualSubmit}
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {loading ? "Saving..." : "Save Project"}
      </button>
    </div>
  );
}
