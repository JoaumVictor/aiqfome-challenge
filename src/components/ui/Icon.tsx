// src/components/ui/Icon.tsx

import React from "react";

// Importa os SVGs como default exports
import AiqFomeIcon from "../../../public/assets/icons/aiqfome.svg";
import LocationIcon from "../../../public/assets/icons/location.svg";
import MoneyIcon from "../../../public/assets/icons/money.svg";
import PencilIcon from "../../../public/assets/icons/pencil.svg";
import PersonIcon from "../../../public/assets/icons/person.svg";
import PurpleHeartIcon from "../../../public/assets/icons/purple-heart.svg";
import PurpleShareIcon from "../../../public/assets/icons/purple-share.svg";
import RightArrowIcon from "../../../public/assets/icons/right-arrow.svg";
import ScooterIcon from "../../../public/assets/icons/scotter.svg";
import SearchIcon from "../../../public/assets/icons/search.svg";
import StarIcon from "../../../public/assets/icons/star.svg";
import Store1Icon from "../../../public/assets/icons/store-1.svg";
import Store2Icon from "../../../public/assets/icons/store-2.svg";
import Store3Icon from "../../../public/assets/icons/store-3.svg";
import Store4Icon from "../../../public/assets/icons/store-4.svg";
import TicketIconLeafIcon from "../../../public/assets/icons/ticket-icon-leaf.svg";
import TicketIconPepperIcon from "../../../public/assets/icons/ticket-icon-pepper.svg";
import TrashIcon from "../../../public/assets/icons/trash.svg";

type SvgComponent = React.FC<React.SVGProps<SVGSVGElement>>;

const mappedIcons: Record<string, SvgComponent> = {
  aiqfome: AiqFomeIcon,
  location: LocationIcon,
  user: PersonIcon,
  motorcycle: ScooterIcon,
  "delivery-fee": ScooterIcon,
  star: StarIcon,
  share: PurpleShareIcon,
  heart: PurpleHeartIcon,
  money: MoneyIcon,
  "chevron-right": RightArrowIcon,
  edit: PencilIcon,
  delete: TrashIcon,
  search: SearchIcon,
  "store-1": Store1Icon,
  "store-2": Store2Icon,
  "store-3": Store3Icon,
  "store-4": Store4Icon,
  "ticket-icon-leaf": TicketIconLeafIcon,
  "ticket-icon-pepper": TicketIconPepperIcon,
};

type IconName = keyof typeof mappedIcons;

type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ name, size = "md", className = "" }) => {
  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return "w-3 h-3";
      case "sm":
        return "w-4 h-4";
      case "md":
        return "w-5 h-5";
      case "lg":
        return "w-6 h-6";
      case "xl":
        return "w-8 h-8";
      case "2xl":
        return "w-10 h-10";
      case "3xl":
        return "w-12 h-12";
      default:
        return "w-5 h-5";
    }
  };

  const commonClasses = `inline-block align-middle flex-shrink-0 ${getSizeClasses()} ${className}`;

  const Component = mappedIcons[name];

  if (!Component) {
    return null;
  }

  return <Component className={commonClasses} />;
};

export default Icon;
