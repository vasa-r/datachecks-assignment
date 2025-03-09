import React from "react";
import { RiseLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="h-svh w-full center bg-vio">
      <RiseLoader
        color="#7f22fe"
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default PageLoader;
