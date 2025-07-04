import { useCart } from "@/hooks/useCart";
import React from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import Container from "./Container";

const Footer: React.FC = () => {
  const { cartItemCount } = useCart();
  const router = useRouter();

  return (
    <footer className="w-full px-[24px] py-[24px] text-center bg-neutral-100 text-purple-700 space-y-[16px]">
      <Container>
        <p className="text-sm font-bold">feito com 💜 em maringá-PR</p>
        {cartItemCount > 0 ? (
          <Button
            className="mt-4 max-w-[400px]"
            onClick={() => router.push("/cart")}
          >
            ver ticket
          </Button>
        ) : (
          <div className="flex flex-col mt-2">
            <p className="text-[16px] font-bold">
              aiqfome.com © 2007-2023 aiqfome LTDA .
            </p>
            <p className="text-[16px] font-bold">CNPJ: 09.186.786/0001-58</p>
          </div>
        )}
      </Container>
    </footer>
  );
};

export default Footer;
