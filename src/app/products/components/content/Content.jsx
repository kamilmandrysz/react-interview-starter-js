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
import Pagination from "components/pagination/Pagination";

import styles from "./Content.module.scss";

const Content = () => {
  const dispatch = useDispatch();
  const { products, currentPage } = useSelector((state) => state.products);

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
    <section>
      <Container className={styles.Content} fluid>
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
        <Pagination />
      </Container>
    </section>
  );
};

export default Content;
