import { useStoresContext } from "@/contexts/StoreContext";

export const useStores = () => {
  return useStoresContext();
};
