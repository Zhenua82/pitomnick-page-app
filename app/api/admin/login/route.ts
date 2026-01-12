import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { message: "Неверный пароль" },
      { status: 401 }
    );
  }

  const cookieStore = await cookies();

  cookieStore.set({
    name: "admin-auth",
    value: "true",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 день
  });

  return NextResponse.json({ success: true });
}