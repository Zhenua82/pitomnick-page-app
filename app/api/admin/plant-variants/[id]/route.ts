import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({}, { status: 401 });
  }

  const { age, photo, price } = await req.json();

  await supabaseServer
    .from("plant_variants")
    .update({ age, photo, price })
    .eq("id", params.id);

  return NextResponse.json({});
}

// -----------------------------------------

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({}, { status: 401 });
  }

  await supabaseServer.from("plant_variants").delete().eq("id", params.id);
  return NextResponse.json({});
}