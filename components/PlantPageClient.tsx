"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import styles from "@/styles/Plant.module.css";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { RootState } from "@/store";
import { QtyControl } from "@/hooks/QtyControl";
import CartSmall from "@/components/cartSmall";
import PhoneButton from "@/components/phoneButton";
import Image from "next/image";
import type { Plant, PlantVariant } from "@/types/plant";

type Props = {
  plant: Plant | null;
};

export default function PlantPageClient({ plant }: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const variants = useMemo(() => {
    return plant?.plant_variants.filter(
      (v) => v.age !== "взрослое растение"
    ) ?? [];
  }, [plant]);

  const adultVariant = useMemo(() => {
    return plant?.plant_variants.find(
      (v) => v.age === "взрослое растение"
    );
  }, [plant]);

  useEffect(() => {
    if (!plant) return;

    const initial: Record<string, number> = {};

    for (const v of variants) {
      const item = cartItems.find(
        (i) => i.slug === plant.slug && i.age === v.age
      );
      initial[v.age] = item?.quantity ?? 0;
    }

    setQty(initial);
  }, [plant, variants, cartItems]);

  const updateCart = useCallback(
    (variant: PlantVariant, newQty: number) => {
      dispatch(
        addItem({
          slug: plant!.slug,
          age: variant.age,
          title: plant!.title,
          photo: variant.photo,
          price: parseInt(String(variant.price).replace(/\D/g, ""), 10),
          quantity: newQty,
        })
      );
    },
    [dispatch, plant]
  );

  if (!plant) {
    return (
      <>
        <h2>Растение не найдено</h2>
        <Link href="/">Вернуться на главную</Link>
      </>
    );
  }

  return (
    <>
      <div className={styles.header}>
        <h1>{plant.title}</h1>
        {plant.podrobnoe_opisanie1 && <p>{plant.podrobnoe_opisanie1}</p>}
      </div>

      <div className={styles.content}>
        <section className={styles.gallery}>
          {variants.map((variant) => {
            const currentQty = qty[variant.age] || 0;

            return (
              <figure key={variant.age} className={styles.figure}>
                <Image
                  src={variant.photo}
                  alt={`${plant.title} — ${variant.age}`}
                  width={300}
                  height={600}
                />

                <figcaption>
                  <strong>{variant.age}</strong>
                  <div className={styles.price}>{variant.price} ₽</div>
                </figcaption>

                <div className={styles.wrapbutton}>
                  <QtyControl
                    onChange={(delta) => {
                      setQty((prev) => {
                        const newQty = Math.min(
                          1000,
                          Math.max(0, (prev[variant.age] || 0) + delta)
                        );

                        queueMicrotask(() => {
                          updateCart(variant, newQty);
                        });

                        if (delta > 0) {
                          setAdded((p) => ({ ...p, [variant.age]: true }));
                          setTimeout(() => {
                            setAdded((p) => ({ ...p, [variant.age]: false }));
                          }, 800);
                        }

                        return { ...prev, [variant.age]: newQty };
                      });
                    }}
                  >
                    <span>{currentQty}</span>
                  </QtyControl>
                </div>

                {added[variant.age] && (
                  <div className={styles.addedFloating}>Добавлено!</div>
                )}
              </figure>
            );
          })}

          {adultVariant && (
            <div className={styles.figure}>
              <Image
                src={adultVariant.photo}
                alt={`${plant.title} — взрослое растение`}
                width={300}
                height={600}
                priority
              />
              <strong>взрослое растение</strong>
            </div>
          )}
        </section>

        <section className={styles.details}>
          <CartSmall />
          <PhoneButton />
        </section>
      </div>

      {plant.podrobnoe_opisanie2 && (
        <div className={styles.header}>
          <p>{plant.podrobnoe_opisanie2}</p>
        </div>
      )}
    </>
  );
}