import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <h1 style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
        Администрирование сайта:
      </h1>

      <main
        style={{
          padding: "40px 16px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link href="/admin/comments" style={{ textDecoration: "none", fontSize: "32px" }}>
          Модерация комментариев
        </Link>

        <Link href="/admin/plants" style={{ textDecoration: "none", fontSize: "32px" }}>
          Модерация товара (растений)
        </Link>
      </main>
    </>
  );
}
