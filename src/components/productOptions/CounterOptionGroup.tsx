import React from "react";
import Icon from "../ui/Icon";
import { ProductOption } from "@/types/store";

interface Props {
  option: ProductOption;
  selectedCount: Record<string, number>;
  onChange: (groupId: string, itemId: string, delta: number) => void;
}

export default function CounterOptionGroup({
  option,
  selectedCount = {},
  onChange,
}: Props) {
  // Soma total de itens selecionados
  const totalSelected = Object.values(selectedCount).reduce(
    (sum, count) => sum + count,
    0
  );

  const max = option.maxSelections ?? Infinity;

  return (
    <ul className="space-y-3">
      {option.items.map((item) => {
        const count = selectedCount[item.id] || 0;
        const canAddMore = totalSelected < max;

        return (
          <li
            key={item.id}
            className="flex items-center justify-between border-b border-neutral-200 pb-2"
          >
            <div className="flex items-center gap-2">
              <button
                className="w-10 h-10 flex items-center justify-center disabled:opacity-50"
                disabled={count <= 0}
                onClick={() => onChange(option.id, item.id, -1)}
              >
                <Icon
                  name="minus"
                  width={20}
                  height={20}
                  className="text-purple-500"
                />
              </button>
              <span className="w-2 text-center">{count}</span>
              <button
                className="w-10 h-10 flex items-center justify-center disabled:opacity-50"
                disabled={!canAddMore}
                onClick={() => onChange(option.id, item.id, 1)}
              >
                <Icon
                  name="plus"
                  width={20}
                  height={20}
                  className="text-purple-500"
                />
              </button>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-sm text-neutral-900">{item.name}</span>
              <span className="text-purple-500 text-sm font-bold">
                +R$ {item.price.toFixed(2).replace(".", ",")}
              </span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
