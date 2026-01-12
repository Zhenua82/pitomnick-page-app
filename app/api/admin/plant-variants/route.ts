import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

export async function POST(req: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({}, { status: 401 });
  }

  const { plant_id, age, photo, price } = await req.json();

  const { error } = await supabaseServer
    .from("plant_variants")
    .insert({ plant_id, age, photo, price });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({}, { status: 201 });
}
