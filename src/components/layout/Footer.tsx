import { useCart } from "@/hooks/useCart";
import React from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

const Footer: React.FC = () => {
  const { cartItemCount } = useCart();
  const router = useRouter();

  return (
    <footer className="w-full px-[24px] py-[24px] text-center bg-neutral-100 text-purple-700 space-y-[16px]">
      <p className="text-sm font-bold">feito com 💜 em maringá-PR</p>
      {cartItemCount > 0 ? (
        <Button onClick={() => router.push("/cart")}>ver ticket</Button>
      ) : (
        <div className="flex flex-col">
          <p className="text-[16px] font-bold mb-[16px]">
            aiqfome.com © 2007-2023 aiqfome LTDA .
          </p>
          <p className="text-[16px] font-bold">CNPJ: 09.186.786/0001-58</p>
        </div>
      )}
    </footer>
  );
};

export default Footer;
