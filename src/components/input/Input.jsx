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
  label,
  isError,
  feedback,
  ...rest
}) => {
  return (
    <div className={cnb(styles.InputWrapper, className)}>
      {label !== "" && <span className={styles.Input__label}>{label}</span>}
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

      {isError && <span className={styles.Input__feedback}>{feedback}</span>}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  innerRef: PropTypes.func,
  name: PropTypes.string,
  isSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  isError: PropTypes.bool,
  feedback: PropTypes.string,
};

Input.defaultProps = {
  className: "",
  innerRef: undefined,
  name: "",
  isSearch: false,
  placeholder: "",
  label: "",
  isError: false,
  feedback: "",
};

export default Input;
