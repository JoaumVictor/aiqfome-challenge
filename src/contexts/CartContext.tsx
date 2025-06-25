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
  isCartLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    try {
      console.log("get local storage");
      const storedCart = localStorage.getItem("aiqfome_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
      localStorage.removeItem("aiqfome_cart");
    } finally {
      setIsCartLoading(false);
    }
  }, []);

  const updateLocalStorage = (newItems: CartItem[]) => {
    try {
      console.log("set local storage");
      localStorage.setItem("aiqfome_cart", JSON.stringify(newItems));
    } catch (error) {
      console.error("Erro ao salvar carrinho:", error);
    }
  };

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
      const unitPrice =
        product.options?.length > 0 ? optionTotal : product.basePrice;
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
        productOptions: product.options,
      };

      setCartItems((prev) => {
        updateLocalStorage([...prev, newItem]);
        return [...prev, newItem];
      });
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
      setCartItems((prev) => {
        const newItems = prev.map((item) => {
          if (item.id === cartItemId) {
            const mockProduct = {
              basePrice: item.basePrice,
              options: item.productOptions,
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
              details: details,
            };
          }
          return item;
        });
        updateLocalStorage(newItems);
        return newItems;
      });
    },
    [calculateItemTotalPrice]
  );

  const removeCartItem = useCallback((cartItemId: string) => {
    setCartItems((prev) => {
      const newItems = prev.filter((item) => item.id !== cartItemId);
      updateLocalStorage(newItems);
      return newItems;
    });
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
        isCartLoading,
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
