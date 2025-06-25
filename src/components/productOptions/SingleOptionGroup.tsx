import React from "react";
import { ProductOption } from "@/types/store";
import Icon from "../ui/Icon";

interface Props {
  option: ProductOption;
  selected: string;
  onChange: (groupId: string, itemId: string) => void;
}

export default function SingleOptionGroup({
  option,
  selected,
  onChange,
}: Props) {
  return (
    <ul className="space-y-3">
      {option.items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between  pb-2 cursor-pointer"
          onClick={() => onChange(option.id, item.id)}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded-full border-2 ${
                selected === item.id
                  ? "border-purple-700 bg-purple-700"
                  : "border-neutral-300"
              }`}
            />
            {item.originalPrice && <Icon name="money" width={24} height={24} />}
            <span className="text-sm text-neutral-900">{item.name}</span>
          </div>

          {item.originalPrice ? (
            <p className="text-neutral-500 text-xs font-bold">
              de R$ {item.originalPrice.toFixed(2).replace(".", ",")} por
              <span className="text-success text-sm font-bold ml-2">
                +R$ {item.price.toFixed(2).replace(".", ",")}
              </span>
            </p>
          ) : item.price ? (
            <span className="text-purple-500 text-sm font-bold">
              +R$ {item.price.toFixed(2).replace(".", ",")}
            </span>
          ) : (
            <></>
          )}
        </li>
      ))}
    </ul>
  );
}
