import { supabaseServer } from "@/lib/supabaseServer";
import type { Plant } from "@/types/plant";
import PlantPageClient from "@/components/PlantPageClient";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// metadata
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // ✅ распаковываем Promise
  const { data } = await supabaseServer
    .from("plants")
    .select("title")
    .eq("slug", resolvedParams.slug)
    .single();

  return {
    title: data ? `${data.title} — купить саженцы` : "Растение",
    description: data
      ? `Купить ${data.title} в питомнике`
      : "Растение не найдено",
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params; // ✅ распаковываем Promise

  const { data } = await supabaseServer
    .from("plants")
    .select(
      `
      id,
      slug,
      title,
      opisanie,
      podrobnoe_opisanie1,
      podrobnoe_opisanie2,
      plant_variants (
        age,
        photo,
        price
      )
    `
    )
    .eq("slug", resolvedParams.slug)
    .single();

  return <PlantPageClient plant={data ?? null} />;
}