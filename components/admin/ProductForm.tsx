"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductForm({ product }: { product?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price") as string),
      imageUrl: formData.get("imageUrl"),
    };

    try {
      if (product) {
        await fetch(`/api/products/${product.id}`, {
          method: "PUT",
          body: JSON.stringify(data),
        });
      } else {
        await fetch("/api/products", {
          method: "POST",
          body: JSON.stringify(data),
        });
      }
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Name
        </label>
        <input
          name="name"
          defaultValue={product?.name}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
          Price ($)
        </label>
        <input
          name="price"
          type="number"
          step="0.01"
          defaultValue={product?.price}
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
          defaultValue={product?.description}
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
          defaultValue={product?.imageUrl}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {loading ? "Saving..." : "Save Product"}
      </button>
    </form>
  );
}
