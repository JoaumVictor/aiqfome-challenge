import React from "react";
import Icon from "../ui/Icon";
import Input from "../ui/Input";
import { useStores } from "@/hooks/useStores";
import Link from "next/link";

interface HeaderProps {
  location?: string;
}

const Header: React.FC<HeaderProps> = ({ location }: HeaderProps) => {
  const { searchTerm, setSearchTerm } = useStores();

  return (
    <header className="flex items-center justify-between w-full p-[16px] text-white bg-purple-500 shadow-lg z-50 h-[128px] flex-col mb-[1px]">
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Icon name="aiqfome" className="text-white" />
        </Link>
        <div className="flex items-center  justify-center w-[70%] gap-2">
          <Icon name="location" height={24} width={24} className="text-white" />
          <div className="flex items-start justify-center w-full flex-col">
            <p className="text-purple-200 font-bold text-[14px]">
              entregando em
            </p>
            <span className="text-[16px] font-bold w-full flex flex-nowrap">
              Rua Mandaguari, 198
              <Icon
                name="right-arrow"
                height={16}
                width={16}
                className="text-white"
              />
            </span>
          </div>
        </div>
        <Icon name="person" height={24} width={24} className="text-white" />
      </div>
      {location && location === "/" && (
        <div className="w-full">
          <Input
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="busque pela loja ou culinária"
          />
        </div>
      )}
    </header>
  );
};

export default Header;
