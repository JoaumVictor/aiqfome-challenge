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
import Container from "@/components/layout/Container";
import Icon from "@/components/ui/Icon";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const {
    cartItems,
    cartTotal,
    removeCartItem,
    updateCartItem,
    isCartLoading,
  } = useCartContext();

  const [store, setStore] = useState<Store>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await getStoreById(cartItems[0]?.storeId);
        if (response) setStore(response);
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
    <div className="min-h-screen flex flex-col justify-between bg-neutral-100 w-full">
      <section className="flex-col flex justify-start items-center w-full">
        <Header />
        <Container>
          {isCartLoading || loading || cartItems.length > 0 ? (
            <Link
              href={isCartLoading || loading ? "" : `/stores/${store?.id}`}
              className="bg-white pt-6 pb-1 px-4 font-bold flex items-center justify-center gap-2"
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
                <div className="w-9 h-8 bg-neutral-600 rounded-sm  animate-pulse" />
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
          ) : (
            <span className="bg-white pt-6 pb-2 px-4 font-bold flex items-center justify-center gap-2 text-purple-500">
              <p className="w-1/2">
                adicione um item no carrinho pra continuar
              </p>
              <Button onClick={() => router.push("/")} className="w-1/2">
                ir para as lojas
              </Button>
            </span>
          )}
          {(!cartItems.length || isCartLoading) && (
            <div className="flex-1 my-32 flex flex-col gap-5 items-center justify-center text-neutral-500">
              {isCartLoading ? "Carregando . . ." : "Carrinho vazio."}
              <Icon name="delivery" />
            </div>
          )}
          {cartItems.length > 0 && !isCartLoading && (
            <main>
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
        </Container>
      </section>
      <footer className="bg-white w-full min-h-[80px]">
        <Container className="flex justify-between items-center py-[16px] px-[32px]">
          <div className="flex flex-col justify-center items-start w=1/3">
            <p className="font-bold text-neutral-900">subtotal</p>
            <p className="text-xl font-extrabold text-purple-500 w-full">
              R$ {cartTotal.toFixed(2).replace(".", ",")}
            </p>
          </div>
          <Button
            disabled={!cartItems.length}
            className={`!w-[200px] bg-purple-500 ${
              !cartItems.length &&
              "bg-neutral-500 hover:bg-neutral-600 cursor-auto"
            }`}
            onClick={handleFinish}
          >
            ir para pagamento
          </Button>
        </Container>
      </footer>
    </div>
  );
}
