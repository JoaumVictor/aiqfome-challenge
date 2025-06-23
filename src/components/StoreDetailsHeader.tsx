// src/components/shared/StoreDetailsHeader.tsx

import React from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { Store } from "@/types/store";

interface StoreDetailsHeaderProps {
  store: Store;
}

const StoreDetailsHeader: React.FC<StoreDetailsHeaderProps> = ({ store }) => {
  const deliveryFeeText =
    store.deliveryFee === 0
      ? "Entrega grátis"
      : `R$ ${store.deliveryFee.toFixed(2).replace(".", ",")}`;
  const minOrderText = `pedido mínimo: R$ ${store.minOrderValue
    .toFixed(2)
    .replace(".", ",")}`;

  return (
    <div className="flex flex-col items-start justify-start w-full py-[24px] px-[16px] gap-[8px]">
      <div className="flex items-center justify-start h-[36px] gap-[8px]  w-full">
        <Image
          src={store.logoUrl}
          alt={`${store.name} Logo`}
          width={36}
          height={36}
          className="rounded-lg object-cover"
        />
        <h1 className="text-xl font-extrabold text-neutral-900">
          {store.name}
        </h1>
      </div>

      <div className="flex items-center justify-between h-[36px]  w-full">
        <span className="flex items-center justify-center gap-1">
          <Icon
            name="purple-share"
            height={16}
            width={16}
            className="text-gray-500 m-[8px]"
          />
          <Icon
            name="purple-heart"
            height={16}
            width={16}
            className="text-gray-500 m-[8px]"
          />
        </span>
        <span className="text-teal-400 font-semibold text-xs flex items-center justify-center gap-1">
          mais infos
          <Icon
            name="right-arrow-2"
            height={10}
            width={10}
            className="text-gray-500"
          />
        </span>
      </div>

      <div className="flex items-center text-gray-600 text-sm mb-2 gap-x-2 w-full">
        <div className="flex items-center gap-1">
          <Icon name="scotter-2" height={24} width={24} />
          <span className="text-purple-500 font-bold">{deliveryFeeText}</span>
        </div>
        <span className="text-neutral-500 font-bold">•</span>
        <span className="text-neutral-500 font-bold">
          hoje, {store.deliveryTime}
        </span>
        <span className="text-neutral-500 font-bold">•</span>
        <span className="text-neutral-500 font-bold">{store.distance}</span>
      </div>

      {store.freeDeliveryThreshold !== null &&
        store.freeDeliveryThreshold > 0 && (
          <div className="bg-teal-50 rounded-sm">
            <p className="text-teal-600 p-2 text-sm font-semibold">
              entrega grátis acima de R${" "}
              {store.freeDeliveryThreshold.toFixed(2).replace(".", ",")}
            </p>
          </div>
        )}

      <div className="flex items-center justify-center text-gray-600 text-sm gap-2">
        <Icon name="star" height={16} width={16} />

        <span className="ml-1 font-bold">{store.rating.toFixed(1)} de 5</span>
        <Icon name="right-arrow-3" height={6} width={6} />

        <span className="text-neutrals-500 font-bold">•</span>
        <span className="text-success font-bold">
          fecha às {store.closesAt}
        </span>
      </div>

      <p className="text-neutrals-500 text-xs font-bold">{minOrderText}</p>
    </div>
  );
};

export default StoreDetailsHeader;
