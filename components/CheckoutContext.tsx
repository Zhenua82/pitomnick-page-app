"use client";

import { createContext, useContext } from "react";

export type CheckoutContextType = {
  openCheckout: () => void;
  closeCheckout: () => void;
  checkoutOpen: boolean;
};

export const CheckoutContext = createContext<CheckoutContextType | null>(null);

export const useCheckout = () => {
  const ctx = useContext(CheckoutContext);
  if (!ctx) {
    throw new Error("useCheckout must be used within CheckoutProvider");
  }
  return ctx;
};
