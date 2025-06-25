// src/components/shared/StoreDetailsHeaderSkeleton.tsx

import React from "react";

const StoreDetailsHeaderSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full py-6 px-4 gap-2 !bg-white animate-pulse">
      <div className="flex items-center justify-between w-full mb-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
        <div className="flex items-center space-x-4">
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
          <div className="w-20 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

      <div className="flex flex-wrap items-center gap-x-2 w-full mb-2">
        <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="w-1 h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="w-1 h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/6"></div>
      </div>

      <div className="h-8 bg-gray-100 rounded w-2/3 py-2 px-4 mb-2"></div>

      <div className="flex items-center gap-2 w-full">
        <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
        <div className="w-1 h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>

      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  );
};

export default StoreDetailsHeaderSkeleton;
