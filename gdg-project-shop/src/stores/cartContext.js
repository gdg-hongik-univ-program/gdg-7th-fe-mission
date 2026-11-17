import { createContext, useContext } from "react";

export const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);
