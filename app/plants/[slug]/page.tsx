import PlantPageClient from "@/components/PlantPageClient";

import { getPlantBySlug, getPlantTitleBySlug } from "@/app/actions";

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// metadata
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const data = await getPlantTitleBySlug(resolvedParams.slug);

  if (!data) {
    return {
      title: "Растение",
      description: "Растение не найдено",
    };
  }

  return {
    title: `${data.title} — купить саженцы`,
    description: `Купить ${data.title} в питомнике`,
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params; // ✅ распаковываем Promise

  const data = await getPlantBySlug(resolvedParams.slug);

  if (!data) return <div>Not found</div>;

  return <PlantPageClient plant={data ?? null} />;
}