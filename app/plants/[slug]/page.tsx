// import PlantPageClient from "@/components/PlantPageClient";
// import {plants} from "@/data/plants"

// type Props = {
//   params: { slug: string } | Promise<{ slug: string }>;
// };

// // metadata
// export async function generateMetadata({ params }: Props) {
//   const resolvedParams = await params; // ✅ распаковываем Promise
//   const items  = Object.values(plants)
//   const data = items.filter((p) => p.slug === resolvedParams.slug)[0]

//   return {
//     title: data ? `${data.title} — купить саженцы` : "Растение",
//     description: data
//       ? `Купить ${data.title} в питомнике`
//       : "Растение не найдено",
//   };
// }

// export default async function Page({ params }: Props) {
//   const resolvedParams = await params; // ✅ распаковываем Promise
//   const items  = Object.values(plants)
//   const data = items.filter((p) => p.slug === resolvedParams.slug)
  
//   return <PlantPageClient plant={data[0] ?? null} />;
// }


import PlantPageClient from "@/components/PlantPageClient";
import { plants } from "@/data/plants";
import type { Metadata } from "next";

type Params = {
  slug: string;
};

type Props = {
  params: Params | Promise<Params>;
};

/**
 * 🔹 Для static export (GitHub Pages)
 */
export function generateStaticParams() {
  return Object.keys(plants).map((slug) => ({ slug }));
}

/**
 * 🔹 Metadata — async + await params
 * Это КЛЮЧ к устранению ошибки в dev
 */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params;
  const plant = plants[resolvedParams.slug];

  if (!plant) {
    return {
      title: "Растение не найдено",
      description: "Растение не найдено",
    };
  }

  return {
    title: `${plant.title} — купить саженцы`,
    description: `Купить ${plant.title} в питомнике`,
  };
}

/**
 * 🔹 Page — тоже async
 */
export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const plant = plants[resolvedParams.slug] ?? null;

  return <PlantPageClient plant={plant} />;
}