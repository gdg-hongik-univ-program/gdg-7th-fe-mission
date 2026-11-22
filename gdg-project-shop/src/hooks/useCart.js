import { useContext } from "react";
import { CartContext } from "../contexts/CartContext.js";

// 장바구니 state와 함수를 꺼내 쓰는 Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart는 CartProvider 안에서만 사용할 수 있습니다");
  }
  return context;
}
