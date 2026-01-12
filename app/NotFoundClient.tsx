"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundClient() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <>
      <h1
        style={{
          color: "red",
          textAlign: "center",
          marginTop: "10%",
          marginBottom: "3%",
        }}
      >
        Страница 404
      </h1>

      <h2 style={{ color: "blue", textAlign: "center" }}>
        Такого адреса на сайте питомника хвойных растений Анапы —
        не существует. Через 5 секунд вы будете автоматически
        перенаправлены на главную страницу этого сайта.
      </h2>
    </>
  );
}