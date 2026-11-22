import { useState } from "react";
import { CartContext } from "./CartContext";

// 장바구니 상태를 만들고 아래 컴포넌트들에게 제공
export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]); // [{ id, count }, ...]

  // 장바구니에 담기 (이미 있으면 그대로)
  function addToCart(id, count) {
    setCart((prev) => {
      if (prev.some((item) => item.id === id)) return prev;
      return [...prev, { id, count }];
    });
  }

  // 장바구니 비우기 (구매 후)
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext>
  );
}