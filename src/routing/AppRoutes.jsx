import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "app/login";
import Products from "app/products";

import { AppRoute } from "./AppRoute.enum";

export const AppRoutes = () => {
  const { loggedIn } = useSelector((state) => state.user);

  return (
    <Switch>
      <Route path={AppRoute.home} exact component={Products} />
      {!loggedIn && <Route path={AppRoute.login} component={Login} />}

      <Redirect to={AppRoute.home} />
    </Switch>
  );
};
