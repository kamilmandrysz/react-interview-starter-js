import React from "react";

import styles from "./Loader.module.scss";

import { ReactComponent as LoaderIcon } from "assets/icons/loader.svg";

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <LoaderIcon />
    </div>
  );
};

export default Loader;
