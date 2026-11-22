import { useReducer } from "react";
import { CartContext } from "./CartContext.js";
import { cartReducer } from "./cartReducer.js";

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = (id, count) => dispatch({ type: "ADD", id, count });
  const clearCart = () => dispatch({ type: "CLEAR" });

  return (
    <CartContext value={{ cart, addToCart, clearCart }}>{children}</CartContext>
  );
}

export default CartProvider;
