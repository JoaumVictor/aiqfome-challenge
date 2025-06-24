// src/hooks/useCart.ts

import { useCartContext } from "@/contexts/CartContext";

export const useCart = () => {
  return useCartContext();
};
