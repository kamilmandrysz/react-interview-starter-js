import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

import styles from "./FormLayout.module.scss";

import loginPic from "assets/images/login.png";

const FormLayout = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div className={styles.FormLayout}>
      {isNotMobile && (
        <img className={styles.FormLayout__image} src={loginPic} alt="login" />
      )}
      {children}
    </div>
  );
};

FormLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormLayout;
