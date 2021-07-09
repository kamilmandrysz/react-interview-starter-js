import React from "react";
import { Link } from "react-router-dom";

import { AppRoute } from "../../routing/AppRoute.enum";

import Header from "app/products/components/header/Header";

export const Products = () => {
  return (
    <>
      <Header />
      <h2>Products page</h2>
      <Link to={AppRoute.login}> Login </Link>
    </>
  );
};
