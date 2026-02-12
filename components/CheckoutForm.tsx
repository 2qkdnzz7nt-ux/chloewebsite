"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { QrCode } from "lucide-react";

export default function CheckoutForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { items, clearCart, totalPrice } = useCartStore();
  const router = useRouter();

  const amount = totalPrice().toFixed(2);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    transactionId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Create order with PENDING status
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          customerName: formData.name,
          customerEmail: formData.email,
          customerAddress: `${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}`,
          totalAmount: totalPrice(),
          paymentIntentId: `MANUAL-${formData.transactionId}`, // Use user-provided transaction ID
        }),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const order = await res.json();

      // Send email notification
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          orderId: order.id,
          items,
          total: totalPrice(),
        }),
      });

      clearCart();
      router.push("/success");
    } catch (err) {
      console.error("Error creating order:", err);
      setMessage("Failed to process order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-zinc-900 dark:text-white">
          Contact Information
        </h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>
        </div>

        <h3 className="pt-4 text-lg font-medium text-zinc-900 dark:text-white">
          Shipping Address
        </h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <label htmlFor="address" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Address
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label htmlFor="city" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="postalCode" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Postal Code
              </label>
              <input
                id="postalCode"
                name="postalCode"
                type="text"
                required
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label htmlFor="country" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Country
            </label>
            <input
              id="country"
              name="country"
              type="text"
              required
              value={formData.country}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
          </div>
        </div>

        <h3 className="pt-4 text-lg font-medium text-zinc-900 dark:text-white">
          Payment Method
        </h3>
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 text-center dark:border-zinc-800 dark:bg-zinc-800/50">
          <p className="mb-4 text-sm font-medium text-zinc-900 dark:text-white">
            Scan with Alipay to Pay
          </p>
          <div className="mx-auto mb-4 flex h-64 w-64 items-center justify-center overflow-hidden rounded-lg bg-white shadow-sm">
             {/* Placeholder for Alipay QR Code */}
             <div className="flex flex-col items-center justify-center space-y-2">
                <QrCode className="h-16 w-16 text-zinc-400" />
                <p className="text-xs text-zinc-500">Alipay QR Code</p>
                <p className="text-xs text-zinc-400">(Please scan and enter amount manually)</p>
             </div>
             {/* Uncomment and use real image: */}
             <img src="/alipay-qr.jpg" alt="Alipay QR Code" className="h-full w-full object-contain" />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
            Total to Pay: <span className="font-bold text-zinc-900 dark:text-white">${totalPrice().toFixed(2)}</span>
          </p>
          
          <div className="text-left">
            <label htmlFor="transactionId" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Transaction ID / Order Note (Required)
            </label>
            <input
              id="transactionId"
              name="transactionId"
              type="text"
              required
              placeholder="Enter the last 4 digits of transaction number"
              value={formData.transactionId}
              onChange={handleChange}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-black focus:outline-none focus:ring-1 focus:ring-black dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:border-white dark:focus:ring-white"
            />
            <p className="mt-1 text-xs text-zinc-500">
              Please enter the transaction number from your Alipay payment receipt to verify your payment.
            </p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "I Have Paid"}
      </button>

      {message && (
        <div className="text-sm text-red-600 dark:text-red-400">
          {message}
        </div>
      )}
    </form>
  );
}
