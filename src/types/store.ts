export interface OptionItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
}

export interface ProductOption {
  id: string;
  type: "single" | "multiple" | "counter";
  title: string;
  minSelections: number;
  maxSelections: number;
  required: boolean;
  items: OptionItem[];
}

export interface Product {
  id: string;
  categoryId: string;
  name: string;
  description: string;
  imageUrl: string;
  basePrice: number;
  originalPrice?: number;
  reviews: number;
  options: ProductOption[];
  isVariablePrice?: boolean;
  tags?: ("hot" | "detox")[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Store {
  id: string;
  name: string;
  logoUrl: string;
  deliveryFee: number;
  deliveryTime: string;
  distance: string;
  minOrderValue: number;
  rating: number;
  isOpen: boolean;
  closesAt: string;
  freeDeliveryThreshold: number | null;
  categories: Category[];
  products: Product[];
}
