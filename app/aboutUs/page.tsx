// app/aboutUs/page.tsx
import React from "react";
import YandexMap from "@/components/YandexMap";
import CartSmall from "@/components/cartSmall";
import PhoneButton from "@/components/phoneButton";
import PlantsSlider from "@/components/PlantsSlider";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import styles from "@/styles/About.module.css";
import { supabaseServer } from "@/lib/supabaseServer";
import type { Plant } from "@/types/plant";

export const metadata = {
  title: "Страница о питомнике хвойных растений в Анапе",
  description: "Описание питомника хвойных растений в Анапе",
};

// =========================
// Server Component
// =========================
export default async function AboutPage() {
  // =========================
  // Fetch plants from Supabase
  // =========================
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

  const plants: Plant[] = data ?? [];

  if (error) {
    console.error(error);
  }

  // =========================
  // Render
  // =========================
  return (
    <>
      <main className={styles.container}>
        <section className={styles.header}>
          <h1>О нас</h1>
          <p className={styles.subtitle}>
            Добро пожаловать в наш питомник хвойных растений — уголок природы и
            зелени!
          </p>
        </section>

        <section className={styles.content}>
          <article className={styles.text}>
            <h2>Наша миссия</h2>
            <p>Мы выращиваем и заботимся о самых красивых и здоровых хвойных растениях.</p>

            <h2>Наше расположение</h2>
            <p>Мы находимся недалеко от Анапы — смотрите карту ниже.</p>

            <h2>Почему выбирают нас</h2>
            <ul>
              <li>Качество растений</li>
              <li>Консультации</li>
              <li>Доставка</li>
            </ul>
          </article>

          {/* Карта яндекса через api (требует ключа (пароля - https://developer.tech.yandex.ru/services/3) формировать карту: https://yandex.ru/dev/maps/archive/doc/jsapi/2-0/ru/quick-start/): */}
          <aside className={styles.mapWrapper}>
            <YandexMap />
          </aside>

          {/* Карта через конструктор карт яндекса - https://yandex.ru/map-constructor/, не требует ключа или пароля (вставлять в код через iframe, если через javaScript - то ломается верстка) */}
          {/*
          <aside className={styles.mapWrapper}>
            <iframe
              title="map"
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab7c58a9b190226bc4c3e6b70b9bbe109d1266474714b9c508800e0b168d22e9e&amp;source=constructor"
              width="100%"
              height="100%"
              frameBorder="0"
            ></iframe>
          </aside>
          */}
        </section>

        <section className={styles.info}>
          <CartSmall />
          <div className={styles.buttonPhone}>
            <PhoneButton />
          </div>
        </section>

        <section className={styles.slyder}>
          <h3>Наши растения</h3>
          {/* PlantsSlider - интерактивный компонент, получаем данные через props */}
          <PlantsSlider plants={plants} />
        </section>

        <section>
          <CommentList />
          <CommentForm />
        </section>
      </main>
    </>
  );
}
