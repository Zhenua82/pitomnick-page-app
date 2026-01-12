import "@/styles/globals.css";
import Providers from "./providers";
import YandexMetrika from "./YandexMetrika";
import ClientShell from "./ClientShell";

export const metadata = {
  title: "Питомник растений",
  description: "Интернет-питомник",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <YandexMetrika />
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
