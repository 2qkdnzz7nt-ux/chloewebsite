import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  try {
    const email = "admin@chloehuang.net";
    const password = "password123";
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        password: hashedPassword,
        name: "Chloe Huang",
        role: "ADMIN",
      },
    });

    return NextResponse.json({ 
      message: "Admin user initialized successfully!",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      }
    });
  } catch (error) {
    console.error("Init Error:", error);
    return NextResponse.json({ error: "Failed to init user" }, { status: 500 });
  }
}
