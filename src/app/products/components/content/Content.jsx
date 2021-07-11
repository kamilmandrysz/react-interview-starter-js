import React from "react";
import { useSelector, useDispatch } from "react-redux";
import queryString from "query-string";
import { Container, Row } from "react-bootstrap";

import useOnMount from "hooks/use-on-mount";

import {
  getProductsWithFilters,
  clearProductsAction,
} from "store/products/actions";

import { ITEMS_PER_PAGE } from "constants/products";

import Product from "app/products/components/content/components/product";
import NoResult from "app/products/components/content/components/noResult";
import Pagination from "components/pagination/Pagination";
import Loader from "components/loader";

import styles from "./Content.module.scss";

const Content = () => {
  const dispatch = useDispatch();
  const { products, currentPage, meta, isReady } = useSelector(
    (state) => state.products
  );

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

  console.log(meta);

  return (
    <section>
      {isReady ? (
        <Container className={styles.Content} fluid>
          {meta.totalItems > 0 ? (
            <>
              <Row>
                {products.map((e) => {
                  const {
                    id,
                    name,
                    description,
                    rating,
                    image,
                    promo,
                    active,
                  } = e;
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
              <Pagination />
            </>
          ) : (
            <NoResult />
          )}
        </Container>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Content;
