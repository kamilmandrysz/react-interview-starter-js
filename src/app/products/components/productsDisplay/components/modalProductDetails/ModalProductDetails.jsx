import React from "react";
import PropType from "prop-types";

import styles from "./ModalProductDetails.module.scss";

import { ReactComponent as Close } from "assets/icons/close.svg";

const ModalProductDetails = ({ onClose, name, image, description }) => {
  return (
    <div className={styles.ModalProductDetails}>
      <img
        src={image}
        alt={name}
        className={styles.ModalProductDetails__image}
      />
      <button className={styles.ModalProductDetails__button} onClick={onClose}>
        <Close />
      </button>
      <div className="d-flex flex-column p-3 px-md-4 py-md-5">
        <h3 className={styles.ModalProductDetails__name}>{name}</h3>
        <p className={styles.ModalProductDetails__description}>{description}</p>
      </div>
    </div>
  );
};

ModalProductDetails.propTypes = {
  onClose: PropType.func.isRequired,
  name: PropType.string.isRequired,
  image: PropType.string.isRequired,
  description: PropType.string.isRequired,
};

export default ModalProductDetails;
