import { createContext, useContext } from "react";

export const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart는 CartProvider 안에서만 사용할 수 있어요.");
  }

  return context;
}