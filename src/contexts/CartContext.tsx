// src/contexts/CartContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { CartItem, SelectedProductOption } from "@/types/cart";
import { Product } from "@/types/store";
import { v4 as uuidv4 } from "uuid";

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (
    storeId: string,
    product: Product,
    quantity: number,
    selectedOptions: SelectedProductOption[],
    details?: string
  ) => void;
  updateCartItem: (
    cartItemId: string,
    newQuantity: number,
    newSelectedOptions: SelectedProductOption[],
    details?: string
  ) => void;
  removeCartItem: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemCount: number;
  getCartItemById: (cartItemId: string) => CartItem | undefined;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("aiqfome_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      localStorage.removeItem("aiqfome_cart");
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("aiqfome_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  }, [cartItems]);

  const calculateOptionTotal = (selectedOptions: SelectedProductOption[]) => {
    return selectedOptions.reduce((sum, group) => {
      return (
        sum +
        group.items.reduce((acc, item) => {
          const qty = item.quantity ?? 1;
          return acc + item.price * qty;
        }, 0)
      );
    }, 0);
  };

  const calculateItemTotalPrice = useCallback(
    (
      product: Product,
      quantity: number,
      selectedOptions: SelectedProductOption[]
    ): { optionTotal: number; unitPrice: number; itemTotal: number } => {
      const optionTotal = calculateOptionTotal(selectedOptions);
      const unitPrice = product.basePrice + optionTotal;
      const itemTotal = unitPrice * quantity;

      return { optionTotal, unitPrice, itemTotal };
    },
    []
  );

  const addItemToCart = useCallback(
    (
      storeId: string,
      product: Product,
      quantity: number,
      selectedOptions: SelectedProductOption[],
      details: string | undefined
    ) => {
      const { optionTotal, unitPrice, itemTotal } = calculateItemTotalPrice(
        product,
        quantity,
        selectedOptions
      );

      const newItem: CartItem = {
        id: uuidv4(),
        storeId,
        productId: product.id,
        productName: product.name,
        productImageUrl: product.imageUrl,
        basePrice: product.basePrice,
        selectedOptions,
        quantity,
        unitPrice,
        optionTotalPrice: optionTotal,
        itemTotalPrice: itemTotal,
        details: details ?? "",
      };

      setCartItems((prev) => [...prev, newItem]);
    },
    [calculateItemTotalPrice]
  );

  const updateCartItem = useCallback(
    (
      cartItemId: string,
      newQuantity: number,
      newSelectedOptions: SelectedProductOption[],
      details: string | undefined
    ) => {
      setCartItems((prev) =>
        prev.map((item) => {
          if (item.id === cartItemId) {
            const mockProduct = {
              basePrice: item.basePrice,
            } as Product;

            const { optionTotal, unitPrice, itemTotal } =
              calculateItemTotalPrice(
                mockProduct,
                newQuantity,
                newSelectedOptions
              );

            return {
              ...item,
              quantity: newQuantity,
              selectedOptions: newSelectedOptions,
              optionTotalPrice: optionTotal,
              unitPrice,
              itemTotalPrice: itemTotal,
              details: details ?? "",
            };
          }
          return item;
        })
      );
    },
    [calculateItemTotalPrice]
  );

  const removeCartItem = useCallback((cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const getCartItemById = useCallback(
    (cartItemId: string) => {
      return cartItems.find((item) => item.id === cartItemId);
    },
    [cartItems]
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.itemTotalPrice,
    0
  );

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        updateCartItem,
        removeCartItem,
        clearCart,
        cartTotal,
        cartItemCount,
        getCartItemById,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
