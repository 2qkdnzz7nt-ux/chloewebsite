import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 rounded-full bg-green-100 p-6 dark:bg-green-900/30">
        <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-400" />
      </div>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
        Payment Successful!
      </h1>
      <p className="mb-8 max-w-md text-zinc-600 dark:text-zinc-400">
        Thank you for your purchase. We've sent a confirmation email with your
        order details.
      </p>
      <Link
        href="/shop"
        className="rounded-full bg-black px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
