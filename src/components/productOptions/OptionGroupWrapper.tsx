import React from "react";

interface Props {
  title: string;
  description: string;
  required?: boolean;
  children: React.ReactNode;
}

export default function OptionGroupWrapper({
  title,
  description,
  required,
  children,
}: Props) {
  return (
    <section className="bg-white my-[2px] p-4 space-y-2 w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-md font-bold text-neutral-900">{title}</h2>
          <p className="text-sm text-neutral-500">{description}</p>
        </div>
        {required && (
          <span className="text-xs text-white bg-neutrals-700 bg-neutrals-200 rounded px-[4px] py-[6px]">
            obrigatório
          </span>
        )}
      </div>
      {children}
    </section>
  );
}
