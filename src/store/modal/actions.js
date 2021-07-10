import * as actionTypes from "store/modal/actionTypes";

export const showModalAction = (modal, props) => ({
  type: actionTypes.SHOW,
  payload: {
    modal,
    props: props || {},
  },
});

export const hideModalAction = (modal) => ({
  type: actionTypes.HIDE,
  payload: {
    modal,
  },
});

export const destroyModalAction = (modal) => ({
  type: actionTypes.DESTROY,
  payload: {
    modal,
  },
});
