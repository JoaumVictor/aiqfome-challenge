"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Store } from "@/types/store";
import { getAllStores } from "@/lib/api";

interface StoreContextType {
  stores: Store[];
  loading: boolean;
  error: string | null;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllStores();
        setStores(data);
      } catch (err) {
        setError("Falha ao carregar as lojas. Por favor, tente novamente.");
        console.error("Erro ao buscar lojas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <StoreContext.Provider value={{ stores, loading, error }}>
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
