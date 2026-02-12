"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } =
    useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold tracking-tight">Your cart is empty</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Looks like you haven't added anything yet.
        </p>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-black px-8 py-3 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="mb-12 text-3xl font-bold tracking-tight">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-7">
          <ul className="divide-y divide-zinc-200 border-b border-t border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
            {items.map((item) => (
              <li key={item.id} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <div className="h-24 w-24 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-800">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-zinc-200 dark:bg-zinc-800">
                        <span className="text-xs text-zinc-500">No image</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link
                            href={`/shop`}
                            className="font-medium text-zinc-900 hover:text-zinc-800 dark:text-white dark:hover:text-zinc-200"
                          >
                            {item.name}
                          </Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-md border border-zinc-300 p-1 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-md border border-zinc-300 p-1 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="absolute right-0 top-0">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="-m-2 inline-flex p-2 text-zinc-400 hover:text-zinc-500"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <section className="mt-16 rounded-lg bg-zinc-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 dark:bg-zinc-900">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
            Order summary
          </h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-zinc-600 dark:text-zinc-400">
                Subtotal
              </dt>
              <dd className="text-sm font-medium text-zinc-900 dark:text-white">
                ${totalPrice().toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between border-t border-zinc-200 pt-4 dark:border-zinc-800">
              <dt className="text-base font-medium text-zinc-900 dark:text-white">
                Order total
              </dt>
              <dd className="text-base font-medium text-zinc-900 dark:text-white">
                ${totalPrice().toFixed(2)}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
