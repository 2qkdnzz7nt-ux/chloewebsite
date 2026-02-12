import { auth } from "@/auth";

export default async function AdminDashboard() {
  const session = await auth();

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        Welcome back, {session?.user?.name}
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Use the sidebar to manage your content.
      </p>
    </div>
  );
}
