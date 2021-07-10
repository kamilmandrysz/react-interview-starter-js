import * as actionTypes from "store/modal/actionTypes";

const initialState = {};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW: {
      const { modal, props } = action.payload;

      return {
        ...state,
        [modal]: {
          isOpen: true,
          props,
        },
      };
    }
    case actionTypes.HIDE: {
      const { modal } = action.payload;

      return {
        ...state,
        [modal]: {
          ...state[modal],
          isOpen: false,
        },
      };
    }
    case actionTypes.DESTROY: {
      const { modal } = action.payload;
      const nextState = { ...state };

      delete nextState[modal];

      return nextState;
    }
    default:
      return state;
  }
};
