import React from "react";

const ErrorDataLoading = ({ error }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-6">
      <div className="text-center text-red-600">Error: {error}</div>
    </div>
  );
};

export default ErrorDataLoading;
