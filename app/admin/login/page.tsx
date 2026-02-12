"use client";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-900">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-md dark:bg-zinc-800">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Admin Login
          </h2>
        </div>
        <form action={formAction} className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-t-md border-0 py-1.5 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 dark:bg-zinc-700 dark:text-white dark:ring-zinc-600 dark:focus:ring-white"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full rounded-b-md border-0 py-1.5 text-zinc-900 ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 dark:bg-zinc-700 dark:text-white dark:ring-zinc-600 dark:focus:ring-white"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-zinc-300 text-black focus:ring-black dark:border-zinc-600 dark:bg-zinc-700 dark:ring-offset-zinc-800"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-zinc-900 dark:text-zinc-300"
              >
                Remember me
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              aria-disabled={isPending}
              className="group relative flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
          {errorMessage && (
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="text-sm text-red-500">{errorMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
