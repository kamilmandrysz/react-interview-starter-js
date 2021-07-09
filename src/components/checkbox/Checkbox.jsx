import React from "react";
import PropTypes from "prop-types";
import { cnb } from "cnbuilder";

import styles from "./Checkbox.module.scss";

import { ReactComponent as CheckIcon } from "assets/icons/check.svg";

const Checkbox = ({ className, label, name, ...rest }) => {
  return (
    <div className="d-flex">
      <label className={cnb(styles.Checkbox, className)}>
        <input
          className={styles.Checkbox__input}
          type="checkbox"
          name={name}
          {...rest}
        />
        <span className={styles.Checkbox__checkbox}>
          <figure
            className={cnb(
              styles.Checkbox__check,
              "d-inline-flex align-items-center justify-content-center mb-0"
            )}
          >
            <CheckIcon />
          </figure>
        </span>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};

export default Checkbox;
