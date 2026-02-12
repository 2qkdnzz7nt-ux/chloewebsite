import Link from "next/link";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200 bg-white py-12 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Chloe Huang. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="#"
            className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white"
          >
            <Instagram className="h-5 w-5" />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="#"
            className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="#"
            className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="mailto:hello@chloehuang.net"
            className="text-zinc-400 transition-colors hover:text-black dark:hover:text-white"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
