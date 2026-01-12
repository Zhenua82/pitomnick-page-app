import Link from "next/link";
import AdminPlants from "@/components/admin/AdminPlants";

export default function AdminPlantsPage() {
  return (
    <main style={{ padding: 24 }}>
      <Link href="/admin" style={{ textDecoration: "none", fontSize: "36px" }}>
        ← Назад
      </Link>

      <h1>Управление растениями</h1>
      <AdminPlants />
    </main>
  );
}
