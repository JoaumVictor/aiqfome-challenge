"use client";

import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Banner from "@/components/shared/Banner";
import { useStores } from "@/hooks/useStores";
import StoreCard from "@/components/StoreCard";

export default function HomePage() {
  const { stores, loading } = useStores();

  useEffect(() => {
    console.log(stores);
  }, [stores]);

  return (
    <>
      <Header />
      <Banner src="/assets/banners/hero-banner.png" alt="hero banner" />
      <Container className="p-[16px]">
        <main className="min-h-[calc(50vh)]">
          <h1 className="text-xl font-extrabold my-[8px] text-purple-500">
            abertos
          </h1>
          <div className="flex flex-col gap-[16px] justify-center items-center">
            {!loading &&
              stores.length !== 0 &&
              stores.map((store) => <StoreCard key={store.id} store={store} />)}
          </div>
        </main>
      </Container>
    </>
  );
}
