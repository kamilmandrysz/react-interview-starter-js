import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cnb } from "cnbuilder";
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

import { ITEMS_PER_PAGE } from "constants/products";

import Input from "components/input";
import Checkbox from "components/checkbox";

import styles from "./SearchForm.module.scss";

const schema = yup.object().shape({
  search: yup.string().notRequired().default(""),
  active: yup.bool().notRequired().default(false),
  promo: yup.bool().notRequired().default(false),
});

const SearchForm = () => {
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.products);
  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...filters,
    },
  });

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

  return (
    <form
      className="d-flex flex-column flex-md-row w-100"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Input
        className={cnb(styles.SearchForm__search, "mt-4 mt-md-0")}
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
    </form>
  );
};

export default SearchForm;
