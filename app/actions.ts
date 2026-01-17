// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";
import type { Plant } from "@/types/plant";

const sql = neon(process.env.DATABASE_URL!);


export async function getAllPlants(): Promise<Plant[]> {
  const rows = await sql`
    SELECT
      p.id,
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
    GROUP BY p.id
    ORDER BY p.title;
  `;

  return rows as Plant[];
}

export async function getPlantTitleBySlug(
  slug: string
): Promise<{ title: string } | null> {
  const rows = await sql`
    SELECT title
    FROM plants
    WHERE slug = ${slug}
    LIMIT 1;
  `;

  return (rows[0] as { title: string } | undefined) ?? null;
}

export async function getPlantBySlug(slug: string): Promise<Plant | null> {
  const rows = await sql`
    SELECT
      p.id,
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
    WHERE p.slug = ${slug}
    GROUP BY p.id
    LIMIT 1;
  `;

  const plant = rows[0] as Plant | undefined;
  return plant ?? null;
}