import update from "immutability-helper";

import * as actionTypes from "store/products/actionTypes";

const initialFilters = {
  search: "",
  promo: false,
  active: false,
};

const initialState = {
  products: [],
  meta: {},
  links: {},
  currentPage: 1,
  filters: { ...initialFilters },
  filtersParams: {},
  isReady: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS: {
      const { products, meta, links } = action.payload;

      return update(state, {
        products: {
          $set: products,
        },
        meta: {
          $set: meta,
        },
        links: {
          $set: links,
        },
      });
    }
    case actionTypes.SET_CURRENT_PAGE: {
      const { currentPage } = action.payload;

      return update(state, {
        currentPage: {
          $set: currentPage,
        },
      });
    }
    case actionTypes.SET_FILTERS: {
      const { filters } = action.payload;

      return update(state, {
        filters: {
          $set: filters,
        },
      });
    }
    case actionTypes.SET_FILTERS_PARAMS: {
      const { filtersParams } = action.payload;

      return update(state, {
        filtersParams: {
          $set: filtersParams,
        },
      });
    }
    case actionTypes.SET_PRODUCTS_READY: {
      return update(state, {
        isReady: {
          $set: true,
        },
      });
    }
    case actionTypes.CLEAR_PRODUCTS: {
      return initialState;
    }
    default:
      return state;
  }
};
