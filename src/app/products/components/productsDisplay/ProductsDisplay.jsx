import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row } from "react-bootstrap";
import queryString from "query-string";

import {
  fetchProductsWithFilters,
  setProductsAction,
  setProductsCurrentPageAction,
} from "store/products/actions";

import Product from "app/products/components/productsDisplay/components/product";
import NoResult from "components/noResult";
import Pagination from "components/pagination";

import { ITEMS_PER_PAGE } from "constants/products";

import styles from "./ProductsDisplay.module.scss";

const ProductsDisplay = () => {
  const dispatch = useDispatch();
  const { products, meta, filtersParams } = useSelector(
    (state) => state.products
  );

  const handlePageChange = (page) => {
    const params = { limit: ITEMS_PER_PAGE, page: page, ...filtersParams };
    const paramsString = queryString.stringify(params, {
      arrayFormat: "comma",
    });

    fetchProductsWithFilters(paramsString).then((res) => {
      const { items, meta, links } = res.data;

      dispatch(setProductsAction(items, meta, links));
      dispatch(setProductsCurrentPageAction(meta.currentPage));
    });
  };

  return (
    <Container className={styles.ProductDisplay} fluid>
      {meta.totalItems > 0 ? (
        <>
          <Row>
            {products.map((e) => {
              const { id, name, description, rating, image, promo, active } = e;
              return (
                <Product
                  key={id}
                  name={name}
                  description={description}
                  rating={rating}
                  image={image}
                  promo={promo}
                  active={active}
                />
              );
            })}
          </Row>
          <Pagination
            totalPages={meta.totalPages}
            onChange={handlePageChange}
          />
        </>
      ) : (
        <NoResult />
      )}
    </Container>
  );
};

export default ProductsDisplay;
