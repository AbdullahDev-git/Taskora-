import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-dark-bg to-dark-bg2">
      <div className="flex flex-col items-center gap-4">
        {/* Animated Spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 animate-spin" />
          <div className="absolute inset-2 rounded-full bg-dark-bg" />
        </div>

        {/* Loading Text */}
        <p className="text-dark-text2 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
