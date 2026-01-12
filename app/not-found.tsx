import type { Metadata } from "next";
import NotFoundClient from "./NotFoundClient";

export const metadata: Metadata = {
  title: "Страница 404 Питомника хвойных растений в Анапе",
  description:
    "Описание страницы 404 Питомника хвойных растений в Анапе",
};

export default function NotFoundPage() {
  return <NotFoundClient />;
}
