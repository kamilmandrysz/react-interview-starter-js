import React from "react";

import { AppRoutes } from "../routing/AppRoutes";
import ModalProvider from "providers/modalProvider";

export const App = () => {
  return (
    <>
      <AppRoutes />
      <ModalProvider name="modal" />
    </>
  );
};
