import React from "react";
import { RiseLoader } from "react-spinners";

const PageLoader = () => {
  return (
    <div className="h-svh w-full center bg-vio">
      <RiseLoader
        color="#7f22fe"
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
        margin={10}
      />
    </div>
  );
};

export default PageLoader;
