import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Col } from "react-bootstrap";
import { cnb } from "cnbuilder";
import { CSSTransition } from "react-transition-group";

import { showModalAction } from "store/modal/actions";

import Button from "components/button";

import ModalProductDetails from "app/products/components/productsDisplay/components/modalProductDetails";

import styles from "./Product.module.scss";

import { ReactComponent as StarBorder } from "assets/icons/star_border.svg";
import { ReactComponent as Star } from "assets/icons/star.svg";

const Product = ({ name, description, rating, image, promo, active }) => {
  const dispatch = useDispatch();
  const displayStart = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<Star key={i} className={styles.Product__star} />);
      } else {
        stars.push(
          <StarBorder key={i} className={styles.Product__starBorder} />
        );
      }
    }
    return stars;
  };

  return (
    <CSSTransition in timeout={300} appear classNames="animation">
      <Col
        className={cnb(styles.Product, "mb-4 px-md-2 px-xl-3")}
        md={6}
        lg={4}
        xl={3}
      >
        <div
          className={cnb(styles.Product__container, "d-flex flex-column h-100")}
        >
          <img
            className={cnb(
              styles.Product__image,
              !active && styles.Product__image__unavailable
            )}
            src={image}
            alt={name}
          />
          {promo && <span className={styles.Product__promo}>Promo</span>}

          <div className={styles.Product__wrapper}>
            <h3 className={cnb(styles.Product__name, "mb-2")}>{name}</h3>
            <p className={styles.Product__description}>{description}</p>
            <div className="d-flex mt-auto mb-3">{displayStart()}</div>
            <Button
              type="button"
              label={active ? "Show details" : "Unavailable"}
              isDisabled={!active}
              onClick={() =>
                dispatch(
                  showModalAction("modal", {
                    component: ModalProductDetails,
                    name,
                    image,
                    description,
                  })
                )
              }
            />
          </div>
        </div>
      </Col>
    </CSSTransition>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  promo: PropTypes.bool.isRequired,
  active: PropTypes.bool.isRequired,
};

export default Product;
