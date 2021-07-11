import React from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";

import Product from "app/products/components/productsDisplay/components/product";
import NoResult from "components/noResult";

import styles from "./ProductsDisplay.module.scss";

const ProductsDisplay = () => {
  const { products, meta } = useSelector((state) => state.products);

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
        </>
      ) : (
        <NoResult />
      )}
    </Container>
  );
};

export default ProductsDisplay;
