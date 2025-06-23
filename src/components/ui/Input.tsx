import Icon from "./Icon";

interface InputProps {
  placeholder?: string;
  className?: string;
}

const Input = ({ placeholder, className }: InputProps) => {
  return (
    <div className="flex items-center justify-center w-full border-[#CDD1D9] border-2 h-[40px] pl-2 bg-white rounded-[8px]">
      <Icon name="search" className=" text-gray-400" width={24} height={24} />
      <input
        type="text"
        className={`w-full rounded-lg p-2 !placeholder-[#6D6F73]  outline-none focus:ring-2 focus:ring-purple-500 ${className}`}
        placeholder={placeholder}
        aria-label="Search"
      />
    </div>
  );
};

export default Input;
