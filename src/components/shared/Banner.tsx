import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

const Banner: React.FC<Props> = ({ src, alt, className }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1920}
      height={600}
      className={`w-full h-auto object-cover mt-[1px] ${className}`}
      priority
    />
  );
};

export default Banner;
