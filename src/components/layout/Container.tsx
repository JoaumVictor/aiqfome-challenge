import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className = "" }) => {
  return (
    <div className={`mx-auto w-full max-w-md px-4 py-2 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
