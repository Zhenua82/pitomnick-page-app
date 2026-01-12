import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

export async function GET() {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({}, { status: 401 });
  }

  const { data, error } = await supabaseServer
    .from("plants")
    .select(`
      id,
      slug,
      title,
      opisanie,
      podrobnoe_opisanie1,
      podrobnoe_opisanie2,
      plant_variants (
        id,
        age,
        photo,
        price
      )
    `)
    .order("title");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// -----------------------------------------

export async function POST(req: Request) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({}, { status: 401 });
  }

  const { slug, title } = await req.json();

  const { error } = await supabaseServer.from("plants").insert({
    slug,
    title,
    opisanie: "",
    podrobnoe_opisanie1: "",
    podrobnoe_opisanie2: "",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({}, { status: 201 });
}
