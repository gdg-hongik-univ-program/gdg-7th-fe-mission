import { createContext, useContext, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // [{ id: 1, count: 3 }, { id: 5, count: 2 }, ...]
  const [cart, setCart] = useState([]);

  // 장바구니 담기 (이미 담긴 상품이면 무시)
  const addToCart = (id, count) => {
    setCart((prev) => {
      if (prev.some((c) => c.id === id)) return prev;
      return [...prev, { id, count }];
    });
  };

  // 장바구니에서 빼기
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  // 장바구니 비우기
  const clearCart = () => setCart([]);

  // 이미 담긴 상품인지 확인
  const isInCart = (id) => cart.some((c) => c.id === id);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart는 CartProvider 안에서만 사용할 수 있어요.");
  }
  return context;
}