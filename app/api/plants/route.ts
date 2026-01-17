import { NextResponse } from "next/server";
import { neon } from "@neondatabase/serverless";
import type { PlantsMap } from "@/types/plant";

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  const rows = await sql`
    SELECT
      p.slug,
      p.title,
      p.opisanie,
      p.podrobnoe_opisanie1,
      p.podrobnoe_opisanie2,
      COALESCE(
        json_agg(
          json_build_object(
            'age', pv.age,
            'photo', pv.photo,
            'price', pv.price
          )
        ) FILTER (WHERE pv.id IS NOT NULL),
        '[]'
      ) AS plant_variants
    FROM plants p
    LEFT JOIN plant_variants pv
      ON pv.plant_id = p.id
    GROUP BY p.slug;
  `;

  const result: PlantsMap = {};

  for (const plant of rows) {
    const photo: Record<string, string> = {};
    const cena: Record<string, string> = {};

    for (const v of plant.plant_variants) {
      photo[v.age] = v.photo;
      cena[v.age] = String(v.price);
    }

    result[plant.slug] = {
      slug: plant.slug,
      title: plant.title,
      opisanie: plant.opisanie ?? "",
      podrobnoeOpisanie1: plant.podrobnoe_opisanie1 ?? "",
      podrobnoeOpisanie2: plant.podrobnoe_opisanie2 ?? "",
      photo,
      cena,
    };
  }

  return NextResponse.json(result);
}
