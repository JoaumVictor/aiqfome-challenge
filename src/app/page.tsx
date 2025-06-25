"use client";

import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";
import Banner from "@/components/shared/Banner";
import { useStores } from "@/hooks/useStores";
import StoreCard from "@/components/store/StoreCard";
import StoreCardSkeleton from "@/components/skeletons/StoreCardSkeleton";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  const { loading, filteredStores, error } = useStores();

  return (
    <div className="min-h-screen flex flex-col justify-between bg-neutral-100 w-full">
      <section className="flex-col flex justify-start items-center w-full">
        <Header location="/" />
        <Banner src="/assets/banners/hero-banner.png" alt="hero banner" />
        <Container className="p-[16px]">
          <main className="flex flex-col gap-[8px] flex-1">
            <section className="min-h-[calc(5vh)] mb-2">
              <h1 className="text-xl font-extrabold my-[8px] text-purple-500">
                abertos
              </h1>
              <div className="flex flex-col gap-[16px] justify-center items-center">
                {loading && (
                  <>
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                  </>
                )}

                {error && <p className="text-error text-center p-4">{error}</p>}

                {!loading && !error && filteredStores.length === 0 && (
                  <p className="text-gray-500 text-center p-4">
                    Nenhuma loja encontrada com esse filtro.
                  </p>
                )}

                {!loading &&
                  !error &&
                  filteredStores.length > 0 &&
                  filteredStores
                    .filter((store) => store.isOpen)
                    .map((store) => <StoreCard key={store.id} store={store} />)}
              </div>
            </section>
            <section className="mt-[8px] min-h-[calc(5vh)]">
              <h1 className="text-xl font-extrabold my-[8px] text-purple-500">
                fechados
              </h1>
              <div className="flex flex-col gap-[16px] justify-center items-center">
                {loading && (
                  <>
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                    <StoreCardSkeleton />
                  </>
                )}

                {error && <p className="text-error text-center p-4">{error}</p>}

                {!loading && !error && filteredStores.length === 0 && (
                  <p className="text-gray-500 text-center p-4">
                    Nenhuma loja encontrada com esse filtro.
                  </p>
                )}

                {!loading &&
                  !error &&
                  filteredStores.length > 0 &&
                  filteredStores
                    .filter((store) => !store.isOpen)
                    .map((store) => <StoreCard key={store.id} store={store} />)}
              </div>
            </section>
          </main>
        </Container>
      </section>
      <Footer />
    </div>
  );
}
