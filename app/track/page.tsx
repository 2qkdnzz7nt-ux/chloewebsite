"use client";

import { useState } from "react";
import { Search, Package, Truck, CheckCircle } from "lucide-react";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // In a real app, you might want a specific public API that only returns status
      // For now, we'll reuse the order API if we implemented a public one, 
      // but since /api/orders is protected or returns all, we should create a public one.
      // Or just filter client side if we don't have a public endpoint? 
      // No, fetching all orders is bad security.
      // Let's assume we can fetch by ID from a new public endpoint /api/track/[id]
      
      const res = await fetch(`/api/track/${orderId}`);
      if (!res.ok) throw new Error("Order not found");
      const data = await res.json();
      setOrder(data);
    } catch (err) {
      setError("Order not found. Please check your Order ID.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Track Your Order
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Enter your Order ID to see the current status.
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2">
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Order ID (e.g., clxyz...)"
            className="flex-1 rounded-md border border-zinc-300 bg-white px-4 py-2 text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center rounded-md bg-black px-4 py-2 font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-400 border-t-white" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </form>

        {error && (
          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error}
          </div>
        )}

        {order && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <div className="mb-4 flex items-center justify-between border-b border-zinc-100 pb-4 dark:border-zinc-800">
              <span className="font-mono text-sm text-zinc-500">
                #{order.id.slice(-6)}
              </span>
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-xs font-semibold ${
                  order.status === "PAID"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : order.status === "SHIPPED"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                }`}
              >
                {order.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-full bg-zinc-100 p-2 dark:bg-zinc-800">
                  <Package className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                    Order Placed
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {order.status === "SHIPPED" && (
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full bg-blue-100 p-2 dark:bg-blue-900/30">
                    <Truck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-zinc-900 dark:text-white">
                      Shipped
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Tracking: {order.trackingNumber}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
