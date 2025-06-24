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
    selectedOptions: SelectedProductOption[]
  ) => void;
  updateCartItem: (
    cartItemId: string,
    newQuantity: number,
    newSelectedOptions: SelectedProductOption[]
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

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("aiqfome_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Falha ao carregar carrinho do localStorage:", error);
      localStorage.removeItem("aiqfome_cart");
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("aiqfome_cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Falha ao salvar carrinho no localStorage:", error);
    }
  }, [cartItems]);

  const calculateItemTotalPrice = useCallback(
    (
      product: Product,
      quantity: number,
      selectedOptions: SelectedProductOption[]
    ): number => {
      let price = product.basePrice;
      selectedOptions.forEach((optionGroup) => {
        optionGroup.items.forEach((item) => {
          price += item.price;
        });
      });
      return price * quantity;
    },
    []
  );

  const addItemToCart = useCallback(
    (
      storeId: string,
      product: Product,
      quantity: number,
      selectedOptions: SelectedProductOption[]
    ) => {
      const itemTotalPrice = calculateItemTotalPrice(
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
        itemTotalPrice,
      };

      setCartItems((prevItems) => [...prevItems, newItem]);
    },
    [calculateItemTotalPrice]
  );

  const updateCartItem = useCallback(
    (
      cartItemId: string,
      newQuantity: number,
      newSelectedOptions: SelectedProductOption[]
    ) => {
      setCartItems((prevItems) =>
        prevItems.map((item) => {
          if (item.id === cartItemId) {
            const productBase = {
              basePrice: item.basePrice,
              id: item.productId,
              name: item.productName,
              categoryId: "",
              description: "",
              imageUrl: "",
              reviews: 0,
              options: [],
            } as Product;
            const updatedItemTotalPrice = calculateItemTotalPrice(
              productBase,
              newQuantity,
              newSelectedOptions
            );

            return {
              ...item,
              quantity: newQuantity,
              selectedOptions: newSelectedOptions,
              itemTotalPrice: updatedItemTotalPrice,
            };
          }
          return item;
        })
      );
    },
    [calculateItemTotalPrice]
  );

  const removeCartItem = useCallback((cartItemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== cartItemId)
    );
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
