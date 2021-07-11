import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cnb } from "cnbuilder";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import queryString from "query-string";

import {
  fetchProductsWithFilters,
  setProductsAction,
  setProductsFiltersAction,
  setProductsCurrentPageAction,
  setProductsFiltersParamsAction,
} from "store/products/actions";

import { AppRoute } from "routing/AppRoute.enum";

import { ITEMS_PER_PAGE } from "constants/products";

import Button from "components/button";
import Input from "components/input";
import Checkbox from "components/checkbox";

import AccountDropdown from "app/products/components/header/components/accountDropdown";

import styles from "app/products/components/header/Header.module.scss";

import logo from "assets/images/logo.png";

const schema = yup.object().shape({
  search: yup.string().notRequired().default(""),
  active: yup.bool().notRequired().default(false),
  promo: yup.bool().notRequired().default(false),
});

const Header = () => {
  const dispatch = useDispatch();
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  const history = useHistory();
  const { filters } = useSelector((state) => state.products);
  const { loggedIn, avatar } = useSelector((state) => state.user);
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...filters,
    },
  });

  const handleLogInClick = () => {
    history.push(AppRoute.login);
  };

  const onSubmit = (data) => {
    const filterParams = {};

    Object.keys(data).forEach((key) => {
      if (data[key] === "" || data[key] === false) {
        return;
      }

      filterParams[key] = data[key];
    });

    const params = { limit: ITEMS_PER_PAGE, page: 1, ...filterParams };
    const paramsString = queryString.stringify(params, {
      arrayFormat: "comma",
    });

    fetchProductsWithFilters(paramsString).then((res) => {
      const { items, meta, links } = res.data;

      dispatch(setProductsAction(items, meta, links));
      dispatch(setProductsCurrentPageAction(meta.currentPage));
      dispatch(setProductsFiltersAction(data));
      dispatch(setProductsFiltersParamsAction(filterParams));
    });
  };

  useEffect(() => {
    Object.keys(filters).forEach((key) => {
      setValue(key, filters[key]);
    });
  }, [setValue, filters]);

  useEffect(() => {
    console.log(avatar);
  }, [avatar]);

  return (
    <header>
      <form
        className={cnb(
          styles.Header,
          "d-flex flex-column flex-md-row align-items-md-center"
        )}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="d-flex justify-content-between align-items-center mb-1 mb-md-0">
          <img src={logo} alt="logo" className={styles.Header__logo} />
          {!isNotMobile &&
            (loggedIn ? (
              <AccountDropdown />
            ) : (
              <div className="d-flex flex-direction-center w-auto">
                <Button
                  type="button"
                  buttonType="secondary"
                  label="Log in"
                  onClick={handleLogInClick}
                />
              </div>
            ))}
        </div>
        <Input
          className={cnb(styles.Header_search, "mt-4 mt-md-0")}
          placeholder="Search"
          isSearch
          name="search"
          innerRef={register}
        />
        <div className="d-flex align-items-center mt-4 mt-md-0">
          <Checkbox
            name="active"
            className="mr-3 mr-md-4"
            label="Active"
            innerRef={register}
          />
          <Checkbox name="promo" label="Promo" innerRef={register} />
        </div>
        {isNotMobile &&
          (loggedIn ? (
            <AccountDropdown />
          ) : (
            <div className="d-flex flex-direction-center w-auto ml-md-auto">
              <Button
                type="button"
                buttonType="secondary"
                label="Log in"
                onClick={handleLogInClick}
              />
            </div>
          ))}
      </form>
    </header>
  );
};

export default Header;
