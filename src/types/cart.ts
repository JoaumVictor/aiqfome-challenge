import { Product } from "./store";

export interface CartItem {
  id: string;
  storeId: string;
  productId: string;
  productName: string;
  productImageUrl: string;
  basePrice: number;
  quantity: number;
  selectedOptions: SelectedProductOption[];
  optionTotalPrice: number;
  unitPrice: number;
  itemTotalPrice: number;
  details?: string;
  productOptions: Product["options"];
}

export interface SelectedProductOption {
  id: string;
  title: string;
  type: "single" | "multiple" | "counter";
  items: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
  }[];
}
