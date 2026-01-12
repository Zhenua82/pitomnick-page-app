"use client";

import Layout from "@/components/Layout";
import CheckoutProvider from "./CheckoutProvider";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <CheckoutProvider>
      <Layout>{children}</Layout>
    </CheckoutProvider>
  );
}
