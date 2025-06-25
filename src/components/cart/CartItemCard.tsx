"use client";

import Link from "next/link";
import { CartItem } from "@/types/cart";
import Icon from "../ui/Icon";

interface Props {
  storeId: string;
  item: CartItem;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: number) => void;
}

export default function CartItemCard({
  storeId,
  item,
  onRemove,
  onUpdateQuantity,
}: Props) {
  return (
    <div className="bg-white p-4 flex flex-col gap-1.5 mb-2">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-neutral-900">{item.productName}</h2>
        <span className="font-bold text-purple-500">
          R$ {item.itemTotalPrice.toFixed(2).replace(".", ",")}
        </span>
      </div>

      <div className="flex justify-end space-x-4 items-center pt-2">
        <Link href={`/stores/${storeId}/item/${item.productId}?type=EDIT-ITEM`}>
          <div className="flex items-center gap-1 text-sm text-purple-700">
            <Icon name="pencil" width={14} height={14} />
            <span className="text-teal-400 cursor-pointer text-sm font-bold">
              editar
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-1.5">
          <button
            className="w-8 h-8 rounded flex items-center justify-center text-purple-500"
            onClick={() => {
              if (item.quantity > 1) {
                onUpdateQuantity(item.id, item.quantity - 1);
              } else {
                onRemove(item.id);
              }
            }}
          >
            <Icon
              width={item.quantity > 1 ? 24 : 20}
              height={item.quantity > 1 ? 24 : 20}
              name={item.quantity > 1 ? "minus-2" : "trash"}
            />
          </button>
          <span className="w-6 text-center text-sm font-bold">
            {item.quantity}
          </span>
          <button
            className="w-8 h-8  rounded flex items-center justify-center text-purple-500"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            <Icon width={24} height={24} name="plus" />
          </button>
        </div>
      </div>

      <div className="text-sm text-neutral-700 space-y-[6px]">
        {item.selectedOptions.map((group) => (
          <div key={group.id}>
            {group.items.length > 0 && (
              <>
                <p className="font-bold text-xs text-[#6D6F73]">
                  • {group.title}
                </p>
                {group.items.map((opt) => (
                  <p key={opt.id} className="pl-2 text-sm">
                    {opt.name}
                    {opt.quantity && opt.quantity > 1 && ` x${opt.quantity}`}
                    {opt.price > 0 && (
                      <span className="text-turquoise font-semibold text-xs ml-1">
                        +R$ {opt.price.toFixed(2).replace(".", ",")}
                      </span>
                    )}
                  </p>
                ))}
              </>
            )}
          </div>
        ))}

        {item.details && (
          <p className="mt-1 bg-neutral-100 p-2 text-xs border-none rounded text-neutral-800">
            <span className="font-bold mr-1">observação:</span> {item.details}
          </p>
        )}
      </div>
    </div>
  );
}
