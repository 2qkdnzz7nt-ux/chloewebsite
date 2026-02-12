"use client";

import CheckoutForm from "@/components/CheckoutForm";
import { useCartStore } from "@/lib/store";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-lg text-zinc-500">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Checkout
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Complete your purchase securely.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-lg font-medium text-zinc-900 dark:text-white">
            Order Summary
          </h2>
          <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
            {items.map((item) => (
              <li key={item.id} className="flex py-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-6 border-t border-zinc-200 pt-6 dark:border-zinc-800">
            <div className="flex justify-between text-base font-medium text-zinc-900 dark:text-white">
              <p>Total</p>
              <p>${totalPrice().toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-zinc-50 p-6 shadow-sm dark:bg-zinc-900">
          <CheckoutForm />
        </div>
      </div>
    </div>
  );
}
