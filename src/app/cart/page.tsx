"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import { useCartContext } from "@/contexts/CartContext";
import { getStoreById } from "@/lib/api";
import { Store } from "@/types/store";
import Button from "@/components/ui/Button";
import CartItemCard from "@/components/cart/CartItemCard";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, cartTotal, removeCartItem, updateCartItem } =
    useCartContext();

  const [store, setStore] = useState<Store>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      if (!cartItems.length) return;
      console.log(cartItems);
      try {
        const response = await getStoreById(cartItems[0].storeId);
        setStore(response);
      } catch (err) {
        console.error("Erro ao carregar loja:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStore();
  }, [cartItems]);

  const handleFinish = () => {
    console.log("finaliza compra...");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Link
        href={`/stores/${store?.id}`}
        className="bg-white pt-6 px-4 font-bold flex items-center justify-center gap-2"
      >
        {store ? (
          <Image
            src={store.logoUrl}
            width={32}
            height={32}
            alt="imagem da loja"
            className="rounded-[4px]"
          />
        ) : (
          <div className="w-9 h-8 bg-neutral-600 rounded-sm  animate-pulse"></div>
        )}

        <div className="text-neutral-500 flex flex-col w-full text-sm">
          seus itens em
          <span className="text-lg font-bold text-neutral-900 text-[16px]">
            {loading
              ? "Carregando loja..."
              : store?.name || "Loja desconhecida"}
          </span>
        </div>
      </Link>

      {!cartItems.length ? (
        <div className="flex-1 flex items-center justify-center text-neutral-500">
          Carrinho vazio.
        </div>
      ) : (
        <main className="flex-1">
          {cartItems.map((item) => (
            <CartItemCard
              storeId={store?.id || ""}
              key={item.id}
              item={item}
              onRemove={removeCartItem}
              onUpdateQuantity={(id, qty) =>
                updateCartItem(id, qty, item.selectedOptions, item.details)
              }
            />
          ))}
        </main>
      )}

      <footer className="p-4 border-t bg-white">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-neutral-700">subtotal</span>
          <span className="text-lg font-bold text-purple-700">
            R$ {cartTotal.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <Button
          disabled={!cartItems.length}
          className={`${
            !cartItems.length &&
            "bg-neutral-500 hover:bg-neutral-600 cursor-auto"
          }`}
          onClick={() => handleFinish}
        >
          ir para pagamento
        </Button>
      </footer>
    </div>
  );
}
