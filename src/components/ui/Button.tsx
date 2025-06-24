import React from "react";
import { cn } from "@/lib/utils";

interface PurpleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export default function Button({
  className,
  children,
  ...props
}: PurpleButtonProps) {
  return (
    <button
      className={cn(
        "text-white h-[48px] rounded-[8px] hover:bg-purple-700 transition-all bg-purple-500 w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
