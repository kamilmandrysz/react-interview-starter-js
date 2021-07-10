import React from "react";
import PropTypes from "prop-types";
import { cnb } from "cnbuilder";

import styles from "./Link.module.scss";

const Link = ({ className, label, isActive, isInactive, onClick }) => {
  return (
    <button
      className={cnb(
        className,
        styles.Link,
        isActive && styles.Link__active,
        isInactive && styles.Link__inactive
      )}
      onClick={!isInactive ? onClick : undefined}
    >
      {label}
    </button>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isActive: PropTypes.bool,
  isInactive: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Link.defaultProps = {
  className: "",
  isActive: false,
  isInactive: false,
};

export default Link;
