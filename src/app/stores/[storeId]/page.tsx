"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import { getStoreById } from "@/lib/api";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import Footer from "@/components/layout/Footer";
import { Store } from "@/types/store";
import StoreDetailsHeader from "@/components/StoreDetailsHeader";

interface StorePageProps {
  params: {
    storeId: string;
  };
}

export default function StorePage({ params }: StorePageProps) {
  const { storeId } = params;
  const [store, setStore] = useState<Store>();
  const [loading, setLoading] = useState(true);

  const getStore = async () => {
    try {
      setLoading(true);
      const response = await getStoreById(storeId);
      if (!response) {
        notFound();
      } else {
        setStore(response);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching store:", error);
      notFound();
    }
  };

  useEffect(() => {
    getStore();
  }, [storeId]);

  return (
    <>
      <Header />
      {!loading && store && (
        <main className="flex flex-col items-center justify-start min-h-screen">
          <StoreDetailsHeader store={store} />
        </main>
      )}
      <Footer />
    </>
  );
}
