import React from "react";
import { useDispatch, useSelector } from "react-redux";
import queryString from "query-string";

import useOnMount from "hooks/use-on-mount";

import {
  getProductsWithFilters,
  clearProductsAction,
} from "store/products/actions";

import { ITEMS_PER_PAGE } from "constants/products";

import TopBarLayout from "layouts/topBarLayout";

import SearchForm from "app/products/components/searchForm";
import ProductsDisplay from "app/products/components/productsDisplay";

import Loader from "components/loader";

const Products = () => {
  const dispatch = useDispatch();
  const { currentPage, isReady } = useSelector((state) => state.products);

  useOnMount(() => {
    const params = { limit: ITEMS_PER_PAGE, page: currentPage };
    const paramsString = queryString.stringify(params, {
      arrayFormat: "comma",
    });

    dispatch(getProductsWithFilters(paramsString, true));

    return () => {
      dispatch(clearProductsAction());
    };
  });

  return (
    <TopBarLayout
      headerChildren={<SearchForm />}
      contentChildren={isReady ? <ProductsDisplay /> : <Loader />}
    />
  );
};

export default Products;
