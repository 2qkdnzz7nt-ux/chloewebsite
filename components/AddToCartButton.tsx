"use client";

import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
}

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex h-10 items-center justify-center gap-2 rounded-full px-4 text-sm font-medium transition-colors ${
        added
          ? "bg-green-600 text-white hover:bg-green-700"
          : "bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      }`}
    >
      <ShoppingCart className="h-4 w-4" />
      {added ? "Added" : "Add to Cart"}
    </button>
  );
}
