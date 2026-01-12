import type { Metadata } from "next";
import CartClient from "./CartClient";

export const metadata: Metadata = {
  title: "Корзина покупок в питомнике хвойных растений в Анапе",
  description:
    "Описание корзины покупок в питомнике хвойных растений в Анапе",
};

export default function CartPage() {
  return <CartClient />;
}
