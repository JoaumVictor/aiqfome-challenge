import React from "react";

const StoreCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex items-center w-full min-h-[72px] animate-pulse">
      <div className="w-[74px] h-[74px] bg-gray-200 rounded-l-lg flex-shrink-0"></div>
      <div className="p-3 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="flex items-center gap-3 text-sm">
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          <div className="h-3 bg-gray-200 rounded w-1/6"></div>
        </div>
      </div>
    </div>
  );
};

export default StoreCardSkeleton;
