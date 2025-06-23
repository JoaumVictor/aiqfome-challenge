// src/components/shared/StoreCard.tsx

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Icon, { IconName } from "@/components/ui/Icon";
import { Store } from "@/types/store";

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  const deliveryFeeText =
    store.deliveryFee === 0
      ? "Grátis"
      : `R$ ${store.deliveryFee.toFixed(2).replace(".", ",")}`;
  const deliveryIconName: IconName =
    store.deliveryFee === 0 ? "scotter" : "delivery";

  return (
    <Link
      href={`/stores/${store.id}`}
      className="bg-neutral-50 rounded-lg overflow-hidden flex items-center w-full min-h-[72px]"
    >
      <Image
        src={store.logoUrl}
        alt={`${store.name} Logo`}
        width={74}
        height={74}
        className="rounded-l-lg object-cover flex-shrink-0"
      />
      <div className=" p-[12px] w-full">
        <h1 className="text-neutral-700 font-bold">{store.name}</h1>
        <div className="w-full flex items-center justify-start gap-1">
          <div className=" flex items-center justify-center gap-1">
            <Icon name={deliveryIconName} className="" width={18} height={18} />
            <h2
              className={`text-[14px] font-bold ${
                store.deliveryFee === 0 ? "!text-teal-600" : "!text-purple-500"
              }`}
            >
              {deliveryFeeText}
            </h2>
          </div>
          <div className=" flex items-center justify-center gap-1">
            <Icon name="star" className="" width={24} height={24} />
            <p className="text-[14px] font-bold text-neutrals-500">
              {store.rating.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StoreCard;
