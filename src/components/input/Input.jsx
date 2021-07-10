import React from "react";
import PropTypes from "prop-types";
import { cnb } from "cnbuilder";

import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

import styles from "./Input.module.scss";

const Input = ({
  className,
  innerRef,
  name,
  isSearch,
  placeholder,
  ...rest
}) => {
  return (
    <div className={cnb(styles.InputWrapper, className)}>
      <input
        ref={innerRef}
        className={cnb(styles.Input, isSearch && styles.Input__search)}
        placeholder={placeholder}
        {...rest}
        name={name}
      />

      {isSearch && (
        <button type="submit" className={styles.SearchIcon}>
          <SearchIcon />
        </button>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.func,
  name: PropTypes.string,
  isSearch: PropTypes.bool,
  placeholder: PropTypes.string,
};

Input.defaultProps = {
  className: "",
  innerRef: undefined,
  name: "",
  isSearch: false,
  placeholder: "",
};

export default Input;
