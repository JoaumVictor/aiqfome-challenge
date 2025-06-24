"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types/store";
import Icon from "@/components/ui/Icon";

export default function ProductCard({
  product,
  storeId,
}: {
  product: Product;
  storeId: string;
}) {
  const router = useRouter();

  return (
    <div
      onClick={() =>
        router.push(`/stores/${storeId}/item/${product.id}?type=ADD-ITEM`)
      }
      className="bg-white cursor-pointer transition flex"
    >
      <div className="flex flex-col justify-between items-start w-8/12">
        <h3 className="text-base font-semibold text-neutral-900">
          {product.name}
        </h3>
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
  );
}
