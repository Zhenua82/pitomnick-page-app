// import { NextResponse } from "next/server";
// import { supabaseServer } from "@/lib/supabaseServer";
// import { checkAdminAuth } from "@/lib/checkAdminAuth";

// export async function PUT(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   if (!(await checkAdminAuth())) {
//     return NextResponse.json({}, { status: 401 });
//   }

//   const { age, photo, price } = await req.json();

//   await supabaseServer
//     .from("plant_variants")
//     .update({ age, photo, price })
//     .eq("id", params.id);

//   return NextResponse.json({});
// }

// // -----------------------------------------

// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   if (!(await checkAdminAuth())) {
//     return NextResponse.json({}, { status: 401 });
//   }

//   await supabaseServer.from("plant_variants").delete().eq("id", params.id);
//   return NextResponse.json({});
// }

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";
import { checkAdminAuth } from "@/lib/checkAdminAuth";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({}, { status: 401 });
  }

  const { id } = await context.params;
  const { age, photo, price } = await req.json();

  const { error } = await supabaseServer
    .from("plant_variants")
    .update({ age, photo, price })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

// -----------------------------------------

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  if (!(await checkAdminAuth())) {
    return NextResponse.json({}, { status: 401 });
  }

  const { id } = await context.params;

  const { error } = await supabaseServer
    .from("plant_variants")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
