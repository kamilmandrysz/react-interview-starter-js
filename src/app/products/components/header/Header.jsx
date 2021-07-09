import React from "react";
import { cnb } from "cnbuilder";
import { useMediaQuery } from "react-responsive";

import Button from "components/button";
import Input from "components/input";
import Checkbox from "components/checkbox";

import styles from "app/products/components/header/Header.module.scss";

import logo from "assets/images/logo.png";

const Header = () => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });

  return (
    <div
      className={cnb(
        styles.Header,
        "d-flex flex-column flex-md-row align-items-md-center"
      )}
    >
      <div className="d-flex justify-content-between align-items-center mb-1 mb-md-0">
        <img src={logo} alt="logo" className={styles.Header__logo} />
        {!isNotMobile && (
          <div className="d-flex flex-direction-center w-auto">
            <Button buttonType="secondary" />
          </div>
        )}
      </div>
      <Input
        className={cnb(styles.Header_search, "mt-4 mt-md-0 mr-md-4 mr-md-5")}
        placeholder="Search"
        isSearch
      />
      <div className="d-flex align-items-center mt-4 mt-md-0">
        <Checkbox className="mr-3 mr-md-4" label="Active" />
        <Checkbox label="Promo" />
      </div>
      {isNotMobile && (
        <div className="d-flex flex-direction-center w-auto ml-md-auto">
          <Button buttonType="secondary" />
        </div>
      )}
    </div>
  );
};

export default Header;
