import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-8 text-2xl font-bold tracking-tight">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
