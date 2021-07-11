import React from "react";
import PropTypes from "prop-types";
import { cnb } from "cnbuilder";

import styles from "./FirstLastPage.module.scss";

const FirstLastPage = ({
  isFirst,
  isLast,
  totalPages,
  currentPage,
  onChange,
}) => {
  return (
    <button
      className={cnb(
        styles.FirstLastPage,
        isFirst && currentPage === 1 && styles.FirstLastPage__disabled,
        isLast && currentPage === totalPages && styles.FirstLastPage__disabled,
        isFirst && "mr-4",
        isLast && "ml-4"
      )}
      type="button"
      onClick={() => onChange(isFirst ? 1 : totalPages)}
    >
      {isFirst ? "First" : "Last"}
    </button>
  );
};

FirstLastPage.propTypes = {
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

FirstLastPage.defaultProps = {
  isFirst: false,
  isLast: false,
};

export default FirstLastPage;
