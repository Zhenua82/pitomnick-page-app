import PlantCard from "@/components/PlantCard";
import PhoneButton from "@/components/phoneButton";
import CartSmall from "@/components/cartSmall";
import styles from "@/styles/Home.module.css";
import {plants} from "@/data/plants"


export const metadata = {
  title: "Питомник хвойных растений в Анапе — купить саженцы и растения",
  description:
    "Большой выбор хвойных саженцев и растений в питомнике Анапы. Заказать саженцы онлайн с доставкой по региону. Гарантия качества и лучшие цены!"
};


export default async function HomePage() {
  const items = Object.values(plants);

  return (
    <>
      <section className={styles.hero}>
        <h1>Питомник хвойных растений</h1><span style={{color: 'red'}}> App Router (fix data)</span>
        <p>
          Короткое приветствие — лучшие саженцы ели, сосны и можжевельника.
        </p>
      </section>

      <section>
        <h2 className={styles.h2}>Наши растения:</h2>

        <div className={styles.grid}>
          {items.map((p) => (
            <PlantCard
              key={p.slug}
              slug={p.slug}
              title={p.title}
              image={p.photo['взрослое растение']}
              opisanie={p.opisanie}
            />
          ))}
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
