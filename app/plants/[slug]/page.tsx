import PlantPageClient from "@/components/PlantPageClient";
import {plants} from "@/data/plants"

type Props = {
  params: { slug: string } | Promise<{ slug: string }>;
};

// metadata
export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params; // ✅ распаковываем Promise
  const items  = Object.values(plants)
  const data = items.filter((p) => p.slug === resolvedParams.slug)[0]

  return {
    title: data ? `${data.title} — купить саженцы` : "Растение",
    description: data
      ? `Купить ${data.title} в питомнике`
      : "Растение не найдено",
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params; // ✅ распаковываем Promise
  const items  = Object.values(plants)
  const data = items.filter((p) => p.slug === resolvedParams.slug)
  
  return <PlantPageClient plant={data[0] ?? null} />;
}