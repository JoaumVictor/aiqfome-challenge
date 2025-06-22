import React from "react";
import Icon from "@/components/ui/Icon";
import Link from "next/link";

interface HeaderProps {
  location?: string;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-primary-dark text-white shadow-lg sticky top-0 z-50">
      <div className="flex-shrink-0">
        <Icon name="aiqfome" size="lg" className="text-white" />
      </div>

      <Link
        href="#"
        className="flex items-center space-x-2 flex-grow mx-4 justify-center"
      >
        <Icon name="location" size="sm" className="text-white" />
        <span className="text-sm font-semibold truncate">
          Rua Mandaguari, 198
        </span>
        <Icon name="chevron-right" size="sm" className="text-white" />
      </Link>

      <div className="flex-shrink-0">
        <Icon name="user" size="lg" className="text-white" />
      </div>
    </header>
  );
};

export default Header;
