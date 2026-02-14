"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronUp, Package, Truck } from "lucide-react";

interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  status: string;
  trackingNumber: string | null;
  createdAt: Date;
  items: any[];
}

function TrackingUpdateForm({ order, updateOrder, updating }: { order: Order; updateOrder: any; updating: string | null }) {
  const [trackingNumber, setTrackingNumber] = useState("");

  const handleSubmit = async () => {
    if (!trackingNumber) return;
    
    await updateOrder(order.id, {
      trackingNumber,
      status: "SHIPPED",
    });

    setTrackingNumber("");
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={trackingNumber}
        onChange={(e) => setTrackingNumber(e.target.value)}
        placeholder="Enter tracking number"
        className="rounded-md border border-zinc-300 px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-800"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <button
        disabled={updating === order.id || !trackingNumber}
        onClick={handleSubmit}
        className="text-sm font-medium text-blue-600 hover:text-blue-500 disabled:opacity-50 dark:text-blue-400"
      >
        Update
      </button>
    </div>
  );
}

export default function OrderList({ initialOrders }: { initialOrders: any[] }) {
  const [orders, setOrders] = useState(initialOrders);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const updateOrder = async (id: string, data: Partial<Order>) => {
    setUpdating(id);
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (res.ok) {
        const updatedOrder = await res.json();
        setOrders(orders.map((o) => (o.id === id ? { ...o, ...updatedOrder } : o)));
      }
    } catch (error) {
      console.error("Failed to update order", error);
    }
    setUpdating(null);
  };

  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <table className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-800">
        <thead className="bg-zinc-50 dark:bg-zinc-800/50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Order ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Total
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Status
            </th>
            <th className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
          {orders.map((order) => (
            <>
              <tr key={order.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50">
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-zinc-900 dark:text-white">
                  #{order.id.slice(-6)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="font-medium text-zinc-900 dark:text-white">
                    {order.customerName}
                  </div>
                  <div>{order.customerEmail}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500 dark:text-zinc-400">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      order.status === "PAID"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <button
                    onClick={() => toggleExpand(order.id)}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {expandedOrderId === order.id ? (
                      <ChevronUp className="h-5 w-5" />
                    ) : (
                      <ChevronDown className="h-5 w-5" />
                    )}
                  </button>
                </td>
              </tr>
              {expandedOrderId === order.id && (
                <tr className="bg-zinc-50 dark:bg-zinc-800/30">
                  <td colSpan={6} className="px-6 py-4">
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-zinc-900 dark:text-white">
                            Items
                          </h4>
                          <ul className="space-y-2">
                            {order.items.map((item: any) => (
                              <li
                                key={item.id}
                                className="flex items-center justify-between text-sm text-zinc-600 dark:text-zinc-400"
                              >
                                <span>
                                  {item.product.name} x {item.quantity}
                                </span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-zinc-900 dark:text-white">
                            Shipping Details
                          </h4>
                          <div className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <p>Tracking: {order.trackingNumber || "Not added"}</p>
                            <TrackingUpdateForm order={order} updateOrder={updateOrder} updating={updating} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
