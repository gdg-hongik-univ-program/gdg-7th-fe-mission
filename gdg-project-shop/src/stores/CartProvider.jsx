import { useState } from "react";
import { CartContext } from "./cartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (id, count) => {
    setCart([...cart, { id, count }]);
  };

  const clearCart = () => {
    setCart([]);
  };

  const isInCart = (id) => cart.some((c) => c.id === id);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
