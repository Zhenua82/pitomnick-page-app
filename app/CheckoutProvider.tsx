"use client";

import { useState } from "react";
import { CheckoutContext } from "@/components/CheckoutContext";

export default function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const openCheckout = () => setCheckoutOpen(true);
  const closeCheckout = () => setCheckoutOpen(false);

  return (
    <CheckoutContext.Provider
      value={{
        checkoutOpen,
        openCheckout,
        closeCheckout,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}
