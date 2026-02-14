import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

import { revalidatePath } from "next/cache";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { id } = await params;

  try {
    await prisma.post.delete({
      where: { id },
    });
    
    revalidatePath('/blog');
    revalidatePath('/admin/posts');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    try {
        const json = await req.json();
        const post = await prisma.post.update({
            where: { id },
            data: json,
        });
        
        revalidatePath('/blog');
        revalidatePath(`/blog/${post.slug}`);
        revalidatePath('/admin/posts');
        
        return NextResponse.json(post);
    } catch (error) {
        console.error("Failed to update post:", error);
        return NextResponse.json({ error: "Failed to update post", details: String(error) }, { status: 500 });
    }
}
