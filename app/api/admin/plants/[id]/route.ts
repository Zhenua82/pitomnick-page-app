import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseServer } from "@/lib/supabaseServer";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin-auth")?.value !== "true") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;
  const body = await req.json();

  const {
    title,
    slug,
    opisanie,
    podrobnoe_opisanie1,
    podrobnoe_opisanie2,
  } = body;

  const { error } = await supabaseServer
    .from("plants")
    .update({
      title,
      slug,
      opisanie,
      podrobnoe_opisanie1,
      podrobnoe_opisanie2,
    })
    .eq("id", id);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  if (cookieStore.get("admin-auth")?.value !== "true") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const { id } = await context.params;

  await supabaseServer.from("plant_variants").delete().eq("plant_id", id);
  await supabaseServer.from("plants").delete().eq("id", id);

  return NextResponse.json({ success: true });
}
