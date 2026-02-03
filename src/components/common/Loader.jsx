import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-12 h-12 border-4 border-gray-700 border-t-indigo-600 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
