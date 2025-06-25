"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Product } from "@/types/store";
import Icon from "@/components/ui/Icon";
import { useCartContext } from "@/contexts/CartContext";
import ConfirmClearCartModal from "@/components/cart/ConfirmClearCartModal";

export default function ProductCard({
  product,
  storeId,
}: {
  product: Product;
  storeId: string;
}) {
  const router = useRouter();
  const { cartItems, clearCart } = useCartContext();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    const isCartFromAnotherStore = cartItems.some(
      (item) => item.storeId !== storeId
    );

    if (isCartFromAnotherStore) {
      setShowModal(true);
    } else {
      router.push(`/stores/${storeId}/item/${product.id}?type=ADD-ITEM`);
    }
  };

  const handleConfirm = () => {
    clearCart();
    setShowModal(false);
    router.push(`/stores/${storeId}/item/${product.id}?type=ADD-ITEM`);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-white cursor-pointer transition flex"
      >
        <div className="flex flex-col justify-between items-start w-8/12">
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-base font-semibold text-neutral-900">
              {product.name}
            </h3>
            {product.tags &&
              product.tags?.map((tag) => (
                <Icon key={tag} name={tag} width={14} height={14} />
              ))}
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{product.description}</p>
        </div>

        <div className="flex flex-col items-end justify-start w-4/12">
          {product.originalPrice && (
            <span className="text-sm text-neutral-500 line-through font-bold">
              R$ {product.originalPrice.toFixed(2).replace(".", ",")}
            </span>
          )}
          <div className="flex justify-end items-center gap-1 mt-1">
            {product.originalPrice && (
              <Icon
                name="money"
                width={16}
                height={16}
                className="text-success"
              />
            )}

            <span
              className={` text-sm font-bold  ${
                product.originalPrice ? "text-success" : "text-purple-500"
              }`}
            >
              R$ {product.basePrice.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </div>
      </div>

      <ConfirmClearCartModal
        open={showModal}
        onConfirm={handleConfirm}
        onCancel={() => setShowModal(false)}
      />
    </>
  );
}
