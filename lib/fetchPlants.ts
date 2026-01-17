// lib/fetchPlants.ts

import { PlantsMap } from "@/types/plant";

export async function fetchPlants(): Promise<PlantsMap> {
  const res = await fetch("/api/plants", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch plants");
  }

  return res.json();
}
