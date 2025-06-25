"use client";

import Icon from "@/components/ui/Icon";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product, Store } from "@/types/store";
import ProductCard from "./ProductCard";

export default function CategorySection({ store }: { store: Store }) {
  const productHasDiscount = (product: Product): boolean => {
    return product.originalPrice !== undefined;
  };

  const categoryHasDiscount = (store: Store, categoryId: string): boolean => {
    return store.products
      .filter((product) => product.categoryId === categoryId)
      .some(productHasDiscount);
  };

  return (
    <Accordion type="multiple" className="w-full">
      {store.categories.map((category) => (
        <AccordionItem
          value={category.id}
          key={category.id}
          className="mb-[4px] px-[16px] py-[13px] bg-white"
        >
          <AccordionTrigger className="cursor-pointer [&>svg]:h-6 [&>svg]:w-7 flex justify-between items-center text-left hover:no-underline">
            <div className="flex flex-col items-start justify-center">
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg font-bold text-neutral-900">
                  {category.name}
                </span>

                <div className="flex items-center gap-2">
                  {categoryHasDiscount(store, category.id) && (
                    <Icon
                      name="money"
                      width={24}
                      height={24}
                      className="text-success"
                    />
                  )}
                </div>
              </span>
              <span className="text-sm font-semibold text-neutral-500">
                {category.description}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 gap-[24px]">
              {store.products
                .filter((product) => product.categoryId === category.id)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    storeId={store.id}
                  />
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
