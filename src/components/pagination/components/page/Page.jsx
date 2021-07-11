import React from "react";
import PropTypes from "prop-types";
import { cnb } from "cnbuilder";

import styles from "./Page.module.scss";

const Page = ({ currentPage, isLast, isDisabled, children, onChange }) => {
  return (
    <button
      className={cnb(
        styles.Page,
        currentPage === children && styles.Page__active,
        isDisabled && styles.Page__disabled,
        !isLast && "mr-2"
      )}
      type="button"
      onClick={() => onChange(children)}
    >
      {children}
    </button>
  );
};

Page.propTypes = {
  currentPage: PropTypes.number.isRequired,
  isLast: PropTypes.bool,
  isDisabled: PropTypes.bool,
  children: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

Page.defaultProps = {
  isLast: false,
  isDisabled: false,
};

export default Page;
