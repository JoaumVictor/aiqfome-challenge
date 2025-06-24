import { useCart } from "@/hooks/useCart";
import React from "react";

const Footer: React.FC = () => {
  const { cartItemCount, cartItems } = useCart();

  console.log(cartItemCount, cartItems);

  return (
    <footer className="w-full px-[16px] py-[24px] text-center bg-neutral-100 text-purple-700">
      <p className="text-sm">feito com 💜 em maringá-PR</p>
      {cartItemCount > 0 ? (
        <button></button>
      ) : (
        <>
          <p className="text-[16px] mt-1">
            aiqfome.com © 2007-2023 aiqfome LTDA .
          </p>
          <p className="text-[16px]">CNPJ: 09.186.786/0001-58</p>
        </>
      )}
    </footer>
  );
};

export default Footer;
