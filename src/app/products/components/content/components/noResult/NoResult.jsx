import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./NoResult.module.scss";

import { ReactComponent as NoResultIcon } from "assets/icons/no_result.svg";

const NoResult = () => {
  return (
    <CSSTransition in timeout={300} appear classNames="animation">
      <div className={styles.NoResult}>
        <NoResultIcon className="mb-3" />
        <h3 className={styles.NoResult__title}>Ooops... It's empty here</h3>
        <p className={styles.NoResult__description}>
          There are no products on the list
        </p>
      </div>
    </CSSTransition>
  );
};

export default NoResult;
