import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const project = await prisma.project.create({
      data: json,
    });
    return NextResponse.json(project);
  } catch (error) {
    console.error("CREATE PROJECT ERROR:", error);
    return NextResponse.json({ error: "Failed to create project", details: String(error) }, { status: 500 });
  }
}
