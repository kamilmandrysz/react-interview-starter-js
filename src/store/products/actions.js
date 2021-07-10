import API from "lib/axios";

import { PRODUCT_ENDPOINTS } from "constants/endpoints";

import * as actionTypes from "store/products/actionTypes";

export const setProductsAction = (products, meta, links) => ({
  type: actionTypes.SET_PRODUCTS,
  payload: {
    products,
    meta,
    links,
  },
});

export const setProductsCurrentPageAction = (currentPage) => ({
  type: actionTypes.SET_CURRENT_PAGE,
  payload: {
    currentPage,
  },
});

export const setProductsFiltersAction = (filters) => ({
  type: actionTypes.SET_FILTERS,
  payload: {
    filters,
  },
});

export const setProductsFiltersParamsAction = (filtersParams) => ({
  type: actionTypes.SET_FILTERS_PARAMS,
  payload: {
    filtersParams,
  },
});

export const setProductsReadyAction = () => ({
  type: actionTypes.SET_PRODUCTS_READY,
});

export const clearProductsAction = () => ({
  type: actionTypes.CLEAR_PRODUCTS,
});

export const fetchProductsWithFilters = (paramsString) => {
  const params = paramsString.length ? `?${paramsString}` : "";

  return API.get(`${PRODUCT_ENDPOINTS.PRODUCTS}${params}`);
};

export const getProductsWithFilters = (paramsString, init = false) => {
  return (dispatch) => {
    fetchProductsWithFilters(paramsString).then((res) => {
      const { items, meta, links } = res.data;

      dispatch(setProductsAction(items, meta, links));

      if (init) {
        dispatch(setProductsReadyAction());
      }
    });
  };
};
