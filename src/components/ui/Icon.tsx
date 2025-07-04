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
  | "right-arrow-2"
  | "right-arrow-3"
  | "scotter"
  | "scotter-2"
  | "search"
  | "star"
  | "store-1"
  | "store-2"
  | "store-3"
  | "store-4"
  | "detox"
  | "hot"
  | "trash"
  | "delivery"
  | "minus"
  | "minus-2"
  | "plus";

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
