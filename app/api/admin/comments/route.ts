import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const approved = searchParams.get("approved");

  const query = supabaseServer
    .from("comments")
    .select("id, author, text, approved, created_at")
    .order("created_at", { ascending: false });

  if (approved === "true") query.eq("approved", true);
  if (approved === "false") query.eq("approved", false);

  const { data, error } = await query;

  if (error) {
    return NextResponse.json(
      { message: "Ошибка загрузки комментариев" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

// ----------------------------------------------

export async function POST(req: Request) {
  const { author, text } = await req.json();

  if (!text || text.trim().length < 3) {
    return NextResponse.json(
      { message: "Комментарий слишком короткий" },
      { status: 400 }
    );
  }

  const { error } = await supabaseServer.from("comments").insert({
    author: author?.trim() || "Аноним",
    text: text.trim(),
    approved: false,
  });

  if (error) {
    return NextResponse.json(
      { message: "Ошибка сохранения комментария" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Комментарий отправлен на модерацию",
  });
}

// ----------------------------------------------

export async function PATCH(req: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json(
      { message: "Не авторизован" },
      { status: 401 }
    );
  }

  const { id, approved } = await req.json();

  if (!id || typeof approved !== "boolean") {
    return NextResponse.json(
      { message: "Некорректные данные" },
      { status: 400 }
    );
  }

  const { error } = await supabaseServer
    .from("comments")
    .update({ approved })
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { message: "Ошибка обновления комментария" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Статус обновлён" });
}

// ----------------------------------------------

export async function DELETE(req: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json(
      { message: "Не авторизован" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { message: "Не указан id" },
      { status: 400 }
    );
  }

  const { error } = await supabaseServer
    .from("comments")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json(
      { message: "Ошибка удаления" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Комментарий удалён" });
}
