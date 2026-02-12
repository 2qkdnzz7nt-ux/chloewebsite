"use client";

import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useState } from "react";
import CartButton from "@/components/CartButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/blog", label: "Blog" },
    { href: "/shop", label: "Shop" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tighter">
          CHLOE HUANG
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <CartButton />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-black md:hidden">
          <div className="flex flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-base font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white"
            >
              <ShoppingBag className="h-5 w-5" />
              Cart
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
