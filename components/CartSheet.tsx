"use client";

import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function CartSheet() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    totalPrice,
  } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-md transform bg-white shadow-xl transition-transform duration-300 dark:bg-zinc-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
              Shopping Cart
            </h2>
            <button
              onClick={closeCart}
              className="rounded-full p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
                <div className="rounded-full bg-zinc-100 p-6 dark:bg-zinc-800">
                  <ShoppingBag className="h-10 w-10 text-zinc-400" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Looks like you haven't added anything yet.
                  </p>
                </div>
                <button
                  onClick={closeCart}
                  className="mt-4 rounded-full bg-black px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-zinc-200 dark:border-zinc-800">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full bg-zinc-200 dark:bg-zinc-800" />
                      )}
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-zinc-900 dark:text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex items-center gap-2 rounded-full border border-zinc-200 px-2 py-1 dark:border-zinc-800">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-4 text-center font-medium dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 text-zinc-500 hover:text-black dark:text-zinc-400 dark:hover:text-white"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="font-medium text-red-600 hover:text-red-500 dark:text-red-400"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
              <div className="flex justify-between text-base font-medium text-zinc-900 dark:text-white">
                <p>Subtotal</p>
                <p>${totalPrice().toFixed(2)}</p>
              </div>
              <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
