import Link from "next/link";
import AdminComments from "@/components/admin/AdminComments";

export default function AdminCommentsPage() {
  return (
    <main style={{ padding: "40px 16px" }}>
      <Link href="/admin" style={{ textDecoration: "none", fontSize: "36px" }}>
        ← Назад
      </Link>

      <h1 style={{ textAlign: "center" }}>Модерация комментариев</h1>
      <AdminComments />
    </main>
  );
}