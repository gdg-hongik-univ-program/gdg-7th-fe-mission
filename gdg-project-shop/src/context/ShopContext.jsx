import { createContext, useContext } from 'react';

export const ShopContext = createContext(null);

export function useShopContext() {
  const context = useContext(ShopContext);
  return context;
}
