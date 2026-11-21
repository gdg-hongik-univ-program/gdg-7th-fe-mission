
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  // 장바구니 상태
  cart: [],

  // 장바구니 담기 (이미 담긴 상품이면 무시)
  addToCart: (id, count) =>
    set((state) => {
      if (state.cart.some((c) => c.id === id)) {
        return state;
      }
      return {
        cart: [...state.cart, { id, count }],
      };
    }),

  // 장바구니에서 빼기
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((c) => c.id !== id),
    })),

  // 장바구니 비우기
  clearCart: () => set({ cart: [] }),

  // 이미 담긴 상품인지 확인
  isInCart: (id) =>
    get().cart.some((c) => c.id === id),
}));
