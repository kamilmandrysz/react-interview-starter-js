import React from "react";

import { AppRoutes } from "../routing/AppRoutes";
import ModalProvider from "providers/modalProvider";
import AccountProvider from "providers/accountProvider";

import Toastr from "components/toastr";

export const App = () => {
  return (
    <>
      <AccountProvider>
        <AppRoutes />
        <Toastr />
      </AccountProvider>
      <ModalProvider name="modal" />
    </>
  );
};
