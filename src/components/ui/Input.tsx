import Icon from "./Icon";
import React from "react";

interface InputProps {
  placeholder?: string;
  className?: string;
  value: string;
  onChange: (value: string) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder,
  className,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-center w-full border-[#CDD1D9] border-2 h-[40px] pl-2 bg-white rounded-[8px]">
      <Icon name="search" className="text-gray-400" width={24} height={24} />
      <input
        type="text"
        className={`w-full rounded-lg p-2 placeholder-[#6D6F73] text-black outline-none focus:ring-0 ring-0 ${className}`}
        placeholder={placeholder}
        aria-label="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
