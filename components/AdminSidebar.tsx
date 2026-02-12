import Link from "next/link";
import { LayoutDashboard, FileText, Briefcase, ShoppingBag, Package, LogOut } from "lucide-react";
import { signOut } from "@/auth";

export default function AdminSidebar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black">
      <div className="flex h-16 items-center justify-center border-b border-zinc-200 dark:border-zinc-800">
        <h1 className="text-xl font-bold tracking-tight">Admin Panel</h1>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        <Link
          href="/admin"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <LayoutDashboard className="h-5 w-5" />
          Dashboard
        </Link>
        <Link
          href="/admin/posts"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <FileText className="h-5 w-5" />
          Posts
        </Link>
        <Link
          href="/admin/projects"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Briefcase className="h-5 w-5" />
          Projects
        </Link>
        <Link
          href="/admin/products"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <ShoppingBag className="h-5 w-5" />
          Products
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Package className="h-5 w-5" />
          Orders
        </Link>
      </nav>
      <div className="border-t border-zinc-200 p-4 dark:border-zinc-800">
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
