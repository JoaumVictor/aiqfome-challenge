import { Store, Product } from "@/types/store";
import storesData from "@/mocks/stores.json";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function getAllStores(): Promise<Store[]> {
  await delay(1500);
  return storesData as Store[];
}

export async function getStoreById(id: string): Promise<Store | undefined> {
  await delay(1500);
  const store = (storesData as Store[]).find((s) => s.id === id);
  return store;
}

export async function getItemById(
  storeId: string,
  productId: string
): Promise<Product | undefined> {
  await delay(1500);
  const store = (storesData as Store[]).find((s) => s.id === storeId);
  if (!store) {
    return undefined;
  }
  const product = store.products.find((p) => p.id === productId);
  return product;
}
