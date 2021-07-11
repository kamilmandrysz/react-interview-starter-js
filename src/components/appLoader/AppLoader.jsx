import React from "react";

import { ReactComponent as LoaderIcon } from "assets/icons/loader.svg";

const AppLoader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 vh-100">
      <LoaderIcon />
    </div>
  );
};

export default AppLoader;
