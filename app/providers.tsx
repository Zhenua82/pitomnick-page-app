"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPlants, restorePlantsFromLS } from "@/store/plantsSlice";
import { restoreCart, updateItemPrice } from "@/store/cartSlice";
// import { addItem, updateQuantity, removeItem, clearCart, restoreCart } from "@/store/cartSlice";

export function ReduxBootstrap({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const plants = useAppSelector((s) => s.plants.data);
  const plantsLoaded = useAppSelector((s) => s.plants.loaded);
  const cartItems = useAppSelector((s) => s.cart.items);

  useEffect(() => {
    dispatch(restorePlantsFromLS());
    dispatch(restoreCart());
  }, [dispatch]);

  useEffect(() => {
    if (!plantsLoaded) {
      dispatch(loadPlants());
    }
  }, [plantsLoaded, dispatch]);

  useEffect(() => {
    if (!plantsLoaded) return;

    for (const item of cartItems) {
      const plant = plants[item.slug];
      if (!plant) continue;

      const priceStr = plant.cena[item.age];
      if (!priceStr) continue;

      const parsed = parseInt(priceStr.replace(/\D/g, ""), 10);
      if (Number.isNaN(parsed)) continue;

      if (parsed !== item.price) {
        dispatch(updateItemPrice({
          slug: item.slug,
          age: item.age,
          price: parsed,
        }));
      }
    }
  }, [plantsLoaded, plants, cartItems, dispatch]);

  return <>{children}</>;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ReduxBootstrap>{children}</ReduxBootstrap>
    </Provider>
  );
}