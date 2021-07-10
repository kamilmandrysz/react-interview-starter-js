import PropTypes from "prop-types";
import React from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { cnb } from "cnbuilder";

import { hideModalAction } from "store/modal/actions";

import { selectModal$ } from "store/modal/selectors";

import styles from "./ModalProvider.module.scss";

ReactModal.setAppElement("#root");

const ModalProvider = ({ name }) => {
  const dispatch = useDispatch();
  const {
    isOpen,
    props: {
      component: Component,
      useOverflow,
      useOverflowHidden,
      shouldCloseOnOverlayClick,
      className,
      ...rest
    },
  } = useSelector((state) => selectModal$(state, name));

  const handleOnClose = () => {
    dispatch(hideModalAction(name));
  };

  if (typeof Component !== "function") {
    return null;
  }

  return (
    <ReactModal
      overlayClassName={styles.Modal__Overlay}
      className={cnb(
        className,
        styles.Modal,
        useOverflow && styles.Modal_overflow,
        useOverflowHidden && styles.Modal_overflowHidden
      )}
      isOpen={isOpen}
      onRequestClose={handleOnClose}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
    >
      <Component onClose={handleOnClose} {...rest} />
    </ReactModal>
  );
};

ModalProvider.propTypes = {
  name: PropTypes.string.isRequired,
};

export default ModalProvider;
