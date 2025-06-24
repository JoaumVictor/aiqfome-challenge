import React from "react";
import { ProductOption } from "@/types/store";

interface Props {
  option: ProductOption;
  selected: string[];
  onChange: (groupId: string, itemId: string) => void;
}

export default function MultipleOptionGroup({
  option,
  selected = [],
  onChange,
}: Props) {
  return (
    <ul className="space-y-3">
      {option.items.map((item) => (
        <li
          key={item.id}
          className="flex items-center justify-between border-b border-neutral-200 pb-2 cursor-pointer"
          onClick={() => onChange(option.id, item.id)}
        >
          <div className="flex items-center gap-2">
            <span
              className={`w-5 h-5 rounded border-2 ${
                selected.includes(item.id)
                  ? "border-purple-600 bg-purple-600"
                  : "border-neutral-300"
              }`}
            />
            <span className="text-sm text-neutral-900">{item.name}</span>
          </div>

          {item.price > 0 && (
            <span className="text-purple-500 text-sm font-bold">
              +R$ {item.price.toFixed(2).replace(".", ",")}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
