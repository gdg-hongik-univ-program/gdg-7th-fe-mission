import { createContext, useContext } from "react";

// 장바구니 Context
export const CartContext = createContext(null);

// 장바구니를 꺼내 쓰는 커스텀 Hook
export function useCart() {
  return useContext(CartContext);
}