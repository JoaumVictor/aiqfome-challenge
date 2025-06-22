import Header from "@/components/layout/Header";
import Container from "@/components/layout/Container";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Container>
          <h1 className="text-2xl text-primary font-bold text-gray-900 mb-4">
            Lojas Abertas
          </h1>
          <div className="flex flex-col space-y-4">
            <p className="text-gray-600">Listagem das lojas virá aqui...</p>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                Logo
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Nome da Loja
                </h2>
                <p className="text-sm text-gray-500">
                  Taxa de entrega · Tempo de entrega · Avaliação
                </p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 flex items-center space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                Logo
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Outra Loja
                </h2>
                <p className="text-sm text-gray-500">
                  Taxa de entrega · Tempo de entrega · Avaliação
                </p>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
}
