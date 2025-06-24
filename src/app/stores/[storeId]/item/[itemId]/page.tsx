"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getStoreById } from "@/lib/api";
import { Product, Store } from "@/types/store";
import StoreDetailsHeaderSkeleton from "@/components/skeletons/StoreDetailsHeaderSkeleton";
import { useCartContext } from "@/contexts/CartContext";
import Icon from "@/components/ui/Icon";
import { SelectedProductOption } from "@/types/cart";

export default function ProductDetailPage() {
  const { storeId, itemId } = useParams<{ storeId: string; itemId: string }>();
  const searchParams = useSearchParams();
  const mode = searchParams.get("type");

  const [store, setStore] = useState<Store | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, any>>(
    {}
  );

  const { cartItems, clearCart, addItemToCart, updateCartItem } =
    useCartContext();

  useEffect(() => {
    if (mode !== "ADD-ITEM" && mode !== "EDIT-ITEM") {
      notFound();
    }
  }, [mode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedStore = await getStoreById(storeId);
        if (!fetchedStore) return notFound();

        const foundProduct = fetchedStore.products.find((p) => p.id === itemId);
        if (!foundProduct) return notFound();

        const hasOtherStoreItems = cartItems.some(
          (item) => item.storeId !== storeId
        );
        if (hasOtherStoreItems) {
          const confirmClear = confirm(
            "Você já tem itens de outra loja no carrinho. Deseja esvaziá-lo?"
          );
          if (!confirmClear) {
            window.history.back();
            return;
          } else {
            clearCart();
          }
        }

        setStore(fetchedStore);
        setProduct(foundProduct);

        // EDIT MODE: load existing options
        if (mode === "EDIT-ITEM") {
          const cartItem = cartItems.find((item) => item.productId === itemId);
          if (cartItem) {
            setQuantity(cartItem.quantity);
            const opt: Record<string, any> = {};
            cartItem.selectedOptions.forEach((group: any) => {
              if (group.type === "single") {
                opt[group.id] = group.items[0].id;
              } else if (group.type === "multiple") {
                opt[group.id] = group.items.map((item: any) => item.id);
              } else if (group.type === "counter") {
                opt[group.id] = Object.fromEntries(
                  group.items.map((item: any) => [item.id, item.quantity])
                );
              }
            });
            setSelectedOptions(opt);
          }
        }
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId, itemId, cartItems, clearCart, mode]);

  const handleSelect = (groupId: string, itemId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [groupId]: itemId }));
  };

  const handleToggle = (groupId: string, itemId: string) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || [];
      return {
        ...prev,
        [groupId]: current.includes(itemId)
          ? current.filter((id: string) => id !== itemId)
          : [...current, itemId],
      };
    });
  };

  const handleCounter = (groupId: string, itemId: string, delta: number) => {
    setSelectedOptions((prev) => {
      const current = prev[groupId] || {};
      const newCount = (current[itemId] || 0) + delta;
      return {
        ...prev,
        [groupId]: {
          ...current,
          [itemId]: Math.max(0, newCount),
        },
      };
    });
  };

  const handleSubmit = () => {
    if (!product || !store) return;

    const formattedOptions: SelectedProductOption[] = product.options.map(
      (group) => {
        const selected = selectedOptions[group.id];

        if (group.type === "single") {
          const selectedItem = group.items.find((i) => i.id === selected);
          return {
            id: group.id,
            title: group.title,
            type: group.type,
            items: selectedItem ? [selectedItem] : [],
          };
        }

        if (group.type === "multiple") {
          const selectedItems = group.items.filter((i) =>
            selected?.includes(i.id)
          );
          return {
            id: group.id,
            title: group.title,
            type: group.type,
            items: selectedItems,
          };
        }

        if (group.type === "counter") {
          const items = group.items
            .map((i) => ({ ...i, quantity: selected?.[i.id] || 0 }))
            .filter((i) => i.quantity > 0);
          return {
            id: group.id,
            title: group.title,
            type: group.type,
            items,
          };
        }

        return {
          id: group.id,
          title: group.title,
          type: group.type,
          items: [],
        };
      }
    );

    if (mode === "EDIT-ITEM") {
      const existingItem = cartItems.find((item) => item.productId === itemId);
      if (existingItem) {
        updateCartItem(existingItem.id, quantity, formattedOptions);
        alert("Item atualizado no carrinho!");
        window.history.back();
      }
    } else {
      addItemToCart(store.id, product, quantity, formattedOptions);
      alert("Item adicionado ao carrinho!");
      window.history.back();
    }
  };

  if (loading || !product || !store) {
    return <StoreDetailsHeaderSkeleton />;
  }

  return (
    <>
      <Header />
      <main className="pb-4">
        <Container className="pt-4 space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900">
              {product.name}
            </h1>
            <p className="text-neutral-500">{product.description}</p>
            <div className="mt-2 text-purple-500 text-lg font-semibold">
              R$ {product.basePrice.toFixed(2).replace(".", ",")}
            </div>
          </div>

          {product.options.map((option, index) => (
            <section
              key={index}
              className="bg-white p-4 rounded-md shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-md font-bold text-neutral-900">
                    {option.title}
                  </h2>
                  <p className="text-sm text-neutral-500">
                    {option.type === "multiple"
                      ? "escolha quantos quiser"
                      : option.maxSelections === 1
                      ? `escolha 1`
                      : `escolha até ${option.maxSelections}`}
                  </p>
                </div>

                {option.required && (
                  <span className="text-xs text-neutrals-700 bg-neutrals-200 rounded px-2 py-0.5">
                    obrigatório
                  </span>
                )}
              </div>

              <ul className="space-y-3">
                {option.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between border-b border-neutral-200 pb-2"
                  >
                    <div className="flex items-center gap-2">
                      <button className="rounded-full border border-purple-500 w-7 h-7 flex items-center justify-center">
                        <Icon
                          name="minus"
                          width={20}
                          height={20}
                          className="text-purple-500"
                        />
                      </button>
                      <span className="w-4 text-center">0</span>
                      <button className="rounded-full border border-purple-500 w-7 h-7 flex items-center justify-center">
                        <Icon
                          name="plus"
                          width={20}
                          height={20}
                          className="text-purple-500"
                        />
                      </button>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-sm text-neutral-900">
                        {item.name}
                      </span>
                      <span className="text-success text-sm font-bold">
                        +R$ {item.price.toFixed(2).replace(".", ",")}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded"
              onClick={handleSubmit}
            >
              {mode === "EDIT-ITEM"
                ? "Atualizar item"
                : "Adicionar ao carrinho"}
            </button>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
