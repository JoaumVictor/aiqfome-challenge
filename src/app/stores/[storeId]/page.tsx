"use client";

import React, { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getStoreById } from "@/lib/api";
import { Store } from "@/types/store";
import StoreDetailsHeader from "@/components/StoreDetailsHeader";
import StoreDetailsHeaderSkeleton from "@/components/skeletons/StoreDetailsHeaderSkeleton";
import CategorySection from "@/components/store/CategorySection";

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [store, setStore] = useState<Store>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const response = await getStoreById(storeId);
        if (!response) {
          notFound();
        } else {
          setStore(response);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchStoreData();
    }
  }, [storeId]);

  return (
    <div className=" bg-neutral-100 w-full">
      <Header />
      <Container className="pb-4">
        {loading || !store ? (
          <StoreDetailsHeaderSkeleton />
        ) : (
          <div className="w-full">
            <StoreDetailsHeader store={store} />
            <CategorySection store={store} />
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}
