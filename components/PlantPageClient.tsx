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
import type { Plant, AgeKey } from "@/types/plant";

type Props = {
  plant: Plant | null;
};

export default function PlantPageClient({ plant }: Props) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [added, setAdded] = useState<Record<string, boolean>>({});

  const variants = useMemo(() => {
    if (!plant) return [];
    return (Object.keys(plant.photo) as AgeKey[]).filter(
      (a) => a !== "взрослое растение"
    );
  }, [plant]);

  // const adultVariant = useMemo(() => {
  //   if (!plant) return [];
  //   return (Object.keys(plant.photo) as AgeKey[]).find(
  //     (a) => a === "взрослое растение"
  //   );
  // }, [plant]);

  const adultVariant = useMemo<AgeKey | null>(() => {
  if (!plant) return null;
  return (Object.keys(plant.photo) as AgeKey[]).find(
    (a) => a === "взрослое растение"
  ) ?? null;
}, [plant]);

  useEffect(() => {
    if (!plant) return;

    const initial: Record<string, number> = {};

    for (const v of variants) {
      const item = cartItems.find(
        (i) => i.slug === plant.slug && i.age === v
      );
      initial[v] = item?.quantity ?? 0;
    }

    setQty(initial);
  }, [plant, variants, cartItems]);

  const updateCart = useCallback(
    (variant: AgeKey | string, newQty: number) => {
      dispatch(
        addItem({
          slug: plant!.slug,
          age: variant,
          title: plant!.title,
          photo: plant!.photo[variant],
          price: parseInt(String(plant!.cena[variant]).replace(/\D/g, ""), 10),
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
        {plant.podrobnoeOpisanie1 && <p>{plant.podrobnoeOpisanie1}</p>}
      </div>

      <div className={styles.content}>
        <section className={styles.gallery}>
          {variants.map((variant) => {
            const currentQty = qty[variant] || 0;

            return (             
              <figure key={variant} className={styles.figure}>
                <Image
                  src={plant.photo[variant]}
                  alt={`${plant.title} — ${variant}`}
                  width={300}
                  height={600}
                />

                <figcaption>
                  <strong>{variant}</strong>
                  <div className={styles.price}>{plant.cena[variant]} ₽</div>
                </figcaption>

                <div className={styles.wrapbutton}>
                  <QtyControl
                    onChange={(delta) => {
                      setQty((prev) => {
                        const newQty = Math.min(
                          1000,
                          Math.max(0, (prev[variant] || 0) + delta)
                        );

                        queueMicrotask(() => {
                          updateCart(variant, newQty);
                        });

                        if (delta > 0) {
                          setAdded((p) => ({ ...p, [variant]: true }));
                          setTimeout(() => {
                            setAdded((p) => ({ ...p, [variant]: false }));
                          }, 800);
                        }
                        return { ...prev, [variant]: newQty };
                      });
                    }}
                  >
                    <span>{currentQty}</span>
                  </QtyControl>
                </div>

                {added[variant] && (
                  <div className={styles.addedFloating}>Добавлено!</div>
                )}
              </figure>
            );
          })}

          {adultVariant && (
            <div className={styles.figure}>
              <Image
                src={plant.photo[adultVariant]}
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

      {plant.podrobnoeOpisanie2 && (
        <div className={styles.header}>
          <p>{plant.podrobnoeOpisanie2}</p>
        </div>
      )}
    </>
  );
}