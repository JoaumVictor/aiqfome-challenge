import React from "react";
import Link from "next/link";
import Icon from "../ui/Icon";

interface HeaderProps {
  location?: string;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex items-center justify-between w-full p-4 bg-primary text-white shadow-lg sticky top-0 z-50 bg-red">
      <div className="flex-shrink-0">
        <Icon name="aiqfome" className="text-white" />
      </div>

      <Link
        href="#"
        className="flex items-center space-x-2 flex-grow mx-4 justify-center"
      >
        {/* <Icon name="location" className="text-white" /> */}
        <p className="text-sm font-semibold truncate text-bl">
          Rua Mandaguari, 198
        </p>
        {/* <Icon name="right-arrow" className="text-white" /> */}
      </Link>

      <div className="flex-shrink-0">
        {/* <Icon name="person" className="text-white" /> */}
      </div>
    </header>
  );
};

export default Header;
