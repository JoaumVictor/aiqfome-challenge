export interface CartItem {
  id: string;
  storeId: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  basePrice: number;
  quantity: number;
  selectedOptions: SelectedProductOption[];

  optionTotalPrice: number; // total dos adicionais
  unitPrice: number; // preço unitário final
  itemTotalPrice: number; // total da linha (unit * quantity)
}

export interface SelectedProductOption {
  id: string;
  title: string;
  type: "single" | "multiple" | "counter";
  items: {
    id: string;
    name: string;
    price: number;
    quantity?: number; // só para "counter"
  }[];
}
