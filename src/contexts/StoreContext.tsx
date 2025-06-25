"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Store } from "@/types/store";
import { getAllStores } from "@/lib/api";

interface StoreContextType {
  stores: Store[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filteredStores: Store[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [allStores, setAllStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllStores();
        setAllStores(data);
      } catch (err) {
        setError("Falha ao carregar as lojas. Por favor, tente novamente.");
        console.error("Erro ao buscar lojas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const filteredStores = useCallback(() => {
    if (!searchTerm) {
      return allStores;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return allStores.filter(
      (store) =>
        store.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        store.categories.some((category) =>
          category.name.toLowerCase().includes(lowerCaseSearchTerm)
        )
    );
  }, [allStores, searchTerm]);

  return (
    <StoreContext.Provider
      value={{
        stores: allStores,
        filteredStores: filteredStores(),
        loading,
        error,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoresContext = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStoresContext must be used within a StoreProvider");
  }
  return context;
};
