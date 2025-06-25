"use client";

import React, { useEffect, useMemo, useState } from "react";
import { notFound, useParams, useSearchParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getStoreById } from "@/lib/api";
import { Product, Store } from "@/types/store";
import StoreDetailsHeaderSkeleton from "@/components/skeletons/StoreDetailsHeaderSkeleton";
import { useCartContext } from "@/contexts/CartContext";
import SingleOptionGroup from "@/components/productOptions/SingleOptionGroup";
import MultipleOptionGroup from "@/components/productOptions/MultipleOptionGroup";
import CounterOptionGroup from "@/components/productOptions/CounterOptionGroup";
import Image from "next/image";
import OptionGroupWrapper from "@/components/productOptions/OptionGroupWrapper";
import { useRouter } from "next/navigation";

export default function ProductDetailPage() {
  const router = useRouter();
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
  const [details, setDetails] = useState("");

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

  const isFormValid = useMemo(() => {
    if (!product) return false;

    return product.options.every((option) => {
      if (!option.required) return true;

      const selected = selectedOptions[option.id];
      if (option.type === "single") {
        return Boolean(selected);
      }

      if (option.type === "multiple") {
        return selected?.length >= option.minSelections;
      }

      if (option.type === "counter") {
        const total = Object.values(selected || {}).reduce(
          (acc: number, val: number) => acc + val,
          0
        );
        return total >= option.minSelections;
      }

      return true;
    });
  }, [product, selectedOptions]);

  const totalPrice = useMemo(() => {
    if (!product) return 0;

    let total = 0;

    if (product.options.length === 0) {
      return product.basePrice;
    }

    product.options.forEach((group) => {
      const selected = selectedOptions[group.id];

      if (group.type === "single") {
        const item = group.items.find((i) => i.id === selected);
        if (item) total += item.price;
      }

      if (group.type === "multiple") {
        const selectedItems = group.items.filter((i) =>
          selected?.includes(i.id)
        );
        selectedItems.forEach((item) => (total += item.price));
      }

      if (group.type === "counter") {
        Object.entries(selected || {}).forEach(([itemId, count]) => {
          const item = group.items.find((i) => i.id === itemId);
          if (item) total += item.price * count;
        });
      }
    });

    return total;
  }, [product, selectedOptions]);

  const handleSubmit = () => {
    if (!product || !store) return;

    const formattedOptions = product.options.map((group) => {
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
    });

    if (mode === "EDIT-ITEM") {
      const existingItem = cartItems.find((item) => item.productId === itemId);
      if (existingItem) {
        updateCartItem(existingItem.id, quantity, formattedOptions, details);
        alert("Item atualizado no carrinho!");
      }
    } else {
      addItemToCart(store.id, product, 1, formattedOptions, details);
      alert("Item adicionado ao carrinho!");
    }
    router.push(`/cart`);
  };

  if (loading || !product || !store) {
    return <StoreDetailsHeaderSkeleton />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-100 w-full">
      <section className="flex-col flex justify-start items-center w-full">
        <Header />
        <Container className="w-full">
          <Image
            src={product.imageUrl}
            width={355}
            height={195}
            alt="foot alternative text"
            className="w-full max-h-[195px] object-cover"
          />
          <main className="pb-4 flex flex-col items-center justify-center gap-2 w-full">
            <div className="text-center flex flex-col items-start justify-center gap-[16px] p-4 w-full">
              <div className="flex flex-col justify-start items-start gap-[6px]  w-full">
                <h1 className="text-xl font-bold text-neutral-700">
                  {product.name}
                </h1>

                <p className="font-extrabold text-sm">
                  a partir de
                  <span className="mt-2 text-purple-500 font-extrabold text-lg">
                    {` R$ ${totalPrice.toFixed(2).replace(".", ",")}`}
                  </span>
                </p>

                <p className="text-neutral-500 text-start text-sm">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-2 w-full">
                <div className="w-1/3 flex items-start justify-center flex-col">
                  <p className="font-bold">quantos?</p>
                  <p>
                    total
                    <span className="font-bold">
                      {` R$ ${(totalPrice ?? product.basePrice)
                        .toFixed(2)
                        .replace(".", ",")}`}
                    </span>
                  </p>
                </div>

                <button
                  className={`h-[40px] w-[108px] rounded-[8px] text-sm py-[11px] transition-all px-[24px] text-white ${
                    isFormValid
                      ? "bg-purple-600 cursor-pointer hover:bg-purple-700"
                      : "bg-neutral-400 cursor-not-allowed"
                  }`}
                  disabled={!isFormValid}
                  onClick={handleSubmit}
                >
                  adicionar
                </button>
              </div>
            </div>

            {product.options.map((option) => {
              const description = (() => {
                const min = option.minSelections ?? 0;
                const max = option.maxSelections ?? Infinity;

                if (option.type === "multiple") {
                  if (max === Infinity && min === 0)
                    return "escolha quantos quiser";
                  if (min === max) return `escolha ${max}`;
                  if (max !== Infinity) return `escolha até ${max}`;
                  return `escolha pelo menos ${min}`;
                }

                if (option.type === "single") {
                  return "escolha 1";
                }

                if (option.type === "counter") {
                  if (min === max) return `escolha ${max} itens`;
                  if (max !== Infinity) return `escolha até ${max} itens`;
                  return `escolha pelo menos ${min} itens`;
                }

                return "";
              })();

              return (
                <OptionGroupWrapper
                  key={option.id}
                  title={option.title}
                  description={description}
                  required={option.required}
                >
                  {option.type === "single" && (
                    <SingleOptionGroup
                      option={option}
                      selected={selectedOptions[option.id] || ""}
                      onChange={handleSelect}
                    />
                  )}
                  {option.type === "multiple" && (
                    <MultipleOptionGroup
                      option={option}
                      selected={selectedOptions[option.id] || []}
                      onChange={handleToggle}
                    />
                  )}
                  {option.type === "counter" && (
                    <CounterOptionGroup
                      option={option}
                      selectedCount={selectedOptions[option.id] || {}}
                      onChange={handleCounter}
                    />
                  )}
                </OptionGroupWrapper>
              );
            })}
            <div className="w-full py-[24px] px-[16px] bg-white">
              <textarea
                name="details"
                onChange={(e) => setDetails(e.target.value)}
                value={details}
                placeholder={`${`alguma observação do item? • opcional \n ex: tirar algum ingrediente, ponto do prato`}`}
                className="w-full min-h-[58px] placeholder:text-neutral-500 placeholder:font-semibold p-4 border border-neutral-500 placeholder:text-sm resize-none"
              ></textarea>
            </div>
          </main>
        </Container>
      </section>

      <Footer />
    </div>
  );
}
