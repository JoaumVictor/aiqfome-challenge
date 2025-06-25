"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Container from "@/components/layout/Container";
import { getStoreById } from "@/lib/api";
import { Store } from "@/types/store";
import StoreDetailsHeader from "@/components/store/StoreDetailsHeader";
import StoreDetailsHeaderSkeleton from "@/components/skeletons/StoreDetailsHeaderSkeleton";
import CategorySection from "@/components/store/CategorySection";

export default function StorePage() {
  const { storeId } = useParams<{ storeId: string }>();
  const [store, setStore] = useState<Store>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const response = await getStoreById(storeId);
        if (!response) {
          router.push("/");
        } else {
          setStore(response);
        }
      } catch (error) {
        console.error("Error fetching store:", error);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (storeId) {
      fetchStoreData();
    }
  }, [storeId]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-100 w-full">
      <section className="flex-col flex justify-start items-center w-full">
        <Header />
        <Container className="pb-4">
          {loading || !store ? (
            <StoreDetailsHeaderSkeleton />
          ) : (
            <>
              <StoreDetailsHeader store={store} />
              <CategorySection store={store} />
            </>
          )}
        </Container>
      </section>
      <Footer />
    </div>
  );
}
