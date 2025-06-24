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
import OptionGroupWrapper from "@/components/productOptions/OptionGroupWrapper";
import SingleOptionGroup from "@/components/productOptions/SingleOptionGroup";
import MultipleOptionGroup from "@/components/productOptions/MultipleOptionGroup";
import CounterOptionGroup from "@/components/productOptions/CounterOptionGroup";
import Image from "next/image";

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

        console.log(foundProduct);

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
        // if (mode === "EDIT-ITEM") {
        //   const cartItem = cartItems.find((item) => item.productId === itemId);
        //   if (cartItem) {
        //     setQuantity(cartItem.quantity);
        //     const opt: Record<string, any> = {};
        //     cartItem.selectedOptions.forEach((group: any) => {
        //       if (group.type === "single") {
        //         opt[group.id] = group.items[0].id;
        //       } else if (group.type === "multiple") {
        //         opt[group.id] = group.items.map((item: any) => item.id);
        //       } else if (group.type === "counter") {
        //         opt[group.id] = Object.fromEntries(
        //           group.items.map((item: any) => [item.id, item.quantity])
        //         );
        //       }
        //     });
        //     setSelectedOptions(opt);
        //   }
        // }
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [storeId, itemId, cartItems, clearCart, mode]);

  const totalPrice = "19,99";

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

    console.log(store.id, product, quantity, formattedOptions);

    // if (mode === "EDIT-ITEM") {
    //   const existingItem = cartItems.find((item) => item.productId === itemId);
    //   if (existingItem) {
    //     updateCartItem(existingItem.id, quantity, formattedOptions);
    //     alert("Item atualizado no carrinho!");
    //     window.history.back();
    //   }
    // }

    // if (mode === "ADD-ITEM") {
    //   addItemToCart(store.id, product, quantity, formattedOptions);
    //   alert("Item adicionado ao carrinho!");
    //   window.history.back();
    // }
  };

  if (loading || !product || !store) {
    return <StoreDetailsHeaderSkeleton />;
  }

  return (
    <>
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
          <div className="mx-2 text-center flex flex-col items-start justify-center gap-2 py-4">
            <h1 className="text-xl font-bold text-neutral-700">
              {product.name}
            </h1>

            <p className="font-extrabold text-sm">
              a partir de{" "}
              <span className="mt-2 text-purple-500 font-extrabold text-lg">
                R$ {product.basePrice.toFixed(2).replace(".", ",")}
              </span>
            </p>

            <p className="text-neutral-500">{product.description}</p>

            <div className="flex items-center justify-between gap-2 w-full">
              <div className="w-1/3 flex items-start justify-center flex-col">
                <p className="font-bold">quantos?</p>
                <p>
                  total <span className="font-bold">{`R$ ${totalPrice}`}</span>
                </p>
              </div>

              <button
                className="h-[40px] w-[108px] bg-neutral-500 text-white rounded-[8px] text-sm py-[11px] px-[24px]"
                // onClick={() => setQuantity(Math.max(1, quantity - 1))}
                onClick={handleSubmit}
              >
                adicionar
              </button>
            </div>
          </div>

          {product.options.map((option) => {
            const description =
              option.type === "multiple"
                ? "escolha quantos quiser"
                : option.maxSelections === 1
                ? `escolha 1`
                : `escolha até ${option.maxSelections}`;

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
        </main>
      </Container>
      <Footer />
    </>
  );
}
