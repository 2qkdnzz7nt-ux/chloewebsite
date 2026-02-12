"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartButton() {
  const totalItems = useCartStore((state) => state.totalItems());
  const toggleCart = useCartStore((state) => state.toggleCart);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="relative p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
      >
        <ShoppingBag className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleCart}
      className="relative p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
    >
      <ShoppingBag className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white dark:bg-white dark:text-black">
          {totalItems}
        </span>
      )}
    </button>
  );
}
