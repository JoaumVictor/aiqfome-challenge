// src/components/Icon.tsx
import Image from "next/image";
import React from "react";

export type IconName =
  | "aiqfome"
  | "location"
  | "money"
  | "pencil"
  | "person"
  | "purple-heart"
  | "purple-share"
  | "right-arrow"
  | "scotter"
  | "search"
  | "star"
  | "store-1"
  | "store-2"
  | "store-3"
  | "store-4"
  | "ticket-icon-leaf"
  | "ticket-icon-pepper"
  | "trash"
  | "delivery";

type Props = {
  name: IconName;
  width?: number;
  height?: number;
  alt?: string;
  className?: string;
};

const Icon: React.FC<Props> = ({
  name,
  width = 32,
  height = 32,
  alt = "",
  className,
}) => {
  return (
    <Image
      src={`/assets/icons/${name}.svg`}
      alt={alt || `${name} icon`}
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Icon;
