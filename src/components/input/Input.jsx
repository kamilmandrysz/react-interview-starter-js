import React from "react";
import PropTypes from "prop-types";
import { cnb } from "cnbuilder";

import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

import styles from "./Input.module.scss";

const Input = ({
  className,
  name,
  isSearch,
  placeholder,
  handleSearch,
  ...rest
}) => {
  return (
    <div className={cnb(styles.InputWrapper, className)}>
      <input
        className={cnb(styles.Input, isSearch && styles.Input__search)}
        placeholder={placeholder}
        {...rest}
      />

      {isSearch && (
        <button
          type="button"
          className={styles.SearchIcon}
          onClick={handleSearch}
        >
          <SearchIcon />
        </button>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  isSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  handleSearch: PropTypes.func,
};

Input.defaultProps = {
  className: "",
  name: "",
  isSearch: false,
  placeholder: "",
  handleSearch: undefined,
};

export default Input;
