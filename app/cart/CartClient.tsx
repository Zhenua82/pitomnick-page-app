"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  updateQuantity,
  removeItem,
  clearCart,
  restoreCart,
} from "@/store/cartSlice";
import styles from "@/styles/Cart.module.css";
import Link from "next/link";
import { QtyControl } from "@/hooks/QtyControl";
import { store } from "@/store";
import Image from "next/image";
import ButtonOformitj from "@/components/buttonOformitj";
import { useRouter } from "next/navigation";

export default function CartClient() {
  const router = useRouter();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    dispatch(restoreCart());
  }, [dispatch]);

  const total = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const perehodGlavn = () => {
    router.push("/");
  };

  return (
    <>
      <h1>Корзина</h1>

      {items.length === 0 ? (
        <p style={{ marginTop: 20 }}>
          Корзина пуста.{" "}
          <Link href="/" style={{ color: "#2f855a" }}>
            Перейти к растениям
          </Link>
        </p>
      ) : (
        <>
          <div className={styles.list}>
            {items.map((item) => (
              <div key={item.slug + item.age} className={styles.card}>
                <Image
                  src={item.photo}
                  alt={`${item.title} — ${item.age}`}
                  width={300}
                  height={400}
                  className={styles.photo}
                />

                <div className={styles.info}>
                  <h3>{item.title}</h3>
                  <p className={styles.age}>Возраст: {item.age}</p>

                  <p className={styles.price}>
                    Цена: <strong>{item.price} ₽</strong>
                  </p>

                  <QtyControl
                    onChange={(delta) => {
                      const current =
                        store
                          .getState()
                          .cart.items.find(
                            (i) =>
                              i.slug === item.slug && i.age === item.age
                          )?.quantity ?? 0;

                      const newQty = Math.min(
                        1000,
                        Math.max(0, current + delta)
                      );

                      dispatch(
                        updateQuantity({
                          slug: item.slug,
                          age: item.age,
                          qty: newQty,
                        })
                      );
                    }}
                  >
                    <span>{item.quantity}</span>
                  </QtyControl>

                  <p className={styles.subtotal}>
                    Сумма:{" "}
                    <strong>{item.quantity * item.price} ₽</strong>
                  </p>

                  <button
                    className={styles.remove}
                    onClick={() =>
                      dispatch(
                        removeItem({
                          slug: item.slug,
                          age: item.age,
                        })
                      )
                    }
                  >
                    Удалить
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.totalBox}>
            <h2>Итого: {total} ₽</h2>

            <div className={styles.wrapbutton}>
              <button
                className={styles.clearBtn}
                onClick={() => dispatch(clearCart())}
              >
                Очистить корзину
              </button>

              <button
                className={styles.addButton}
                onClick={perehodGlavn}
              >
                Добавить товар в корзину
              </button>

              <ButtonOformitj />
            </div>
          </div>
        </>
      )}
    </>
  );
}
