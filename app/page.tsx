import PlantCard from "@/components/PlantCard";
import PhoneButton from "@/components/phoneButton";
import CartSmall from "@/components/cartSmall";
import styles from "@/styles/Home.module.css";

import { supabaseServer } from "@/lib/supabaseServer";
import type { Plant } from "@/types/plant";

export const dynamic = "force-dynamic";


export const metadata = {
  title: "Питомник хвойных растений в Анапе — купить саженцы и растения",
  description:
    "Большой выбор хвойных саженцев и растений в питомнике Анапы. Заказать саженцы онлайн с доставкой по региону. Гарантия качества и лучшие цены!"
};

async function getPlants(): Promise<Plant[]> {
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
        age,
        photo,
        price
      )
    `)
    .order("title");

  if (error) return [];
  return data ?? [];
}

export default async function HomePage() {
  const plants = await getPlants();

  return (
    <>
      <section className={styles.hero}>
        <h1>Питомник хвойных растений</h1>
        <p>
          Короткое приветствие — лучшие саженцы ели, сосны и можжевельника.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Наши растения:</h2>

        <div className={styles.grid}>
          {plants.map((p) => {
            const adultVariant = p.plant_variants.find(
              (v) => v.age === "взрослое растение"
            );

            if (!adultVariant) return null;

            return (
              <PlantCard
                key={p.slug}
                slug={p.slug}
                title={p.title}
                image={adultVariant.photo}
                opisanie={p.opisanie ?? ""}
              />
            );
          })}
        </div>
      </section>

      <section className={styles.info}>
        <div>
          <h2 className={styles.h2}>Почему мы</h2>
          <ul>
            <li>Качественные саженцы</li>
            <li>Доставка и консультации по посадке</li>
            <li>Гарантии приживаемости на первое время</li>
          </ul>
        </div>

        <div>
          <CartSmall />
        </div>

        <div className={styles.buttonPhone}>
          <PhoneButton />
        </div>
      </section>
    </>
  );
}
