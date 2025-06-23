"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import { getStoreById } from "@/lib/api";
import Footer from "@/components/layout/Footer";
import { Store } from "@/types/store";
import StoreDetailsHeader from "@/components/StoreDetailsHeader";
import StoreDetailsHeaderSkeleton from "./../../../components/skeletons/StoreDetailsHeaderSkeleton";

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
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
      {(loading || !store) && (
        <main className="flex flex-col items-center justify-start min-h-screen">
          <StoreDetailsHeaderSkeleton />
        </main>
      )}
      {!loading && store && (
        <main className="flex flex-col items-center justify-start min-h-screen">
          <StoreDetailsHeader store={store} />
        </main>
      )}

      <Footer />
    </>
  );
}
