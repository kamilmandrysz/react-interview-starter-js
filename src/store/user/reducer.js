import update from "immutability-helper";

import * as actionTypes from "store/user/actionTypes";

const initialState = {
  loggedIn: false,
  loggedOut: false,
  appLoading: true,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DETAILS: {
      const { details } = action.payload;

      return update(state, {
        $merge: details,
      });
    }
    case actionTypes.SET_LOGGED_IN: {
      const { loggedIn } = action.payload;

      return update(state, {
        loggedIn: {
          $set: loggedIn,
        },
        loggedOut: {
          $set: !loggedIn,
        },
      });
    }
    case actionTypes.LOGOUT: {
      return update(state, {
        loggedIn: {
          $set: false,
        },
        loggedOut: {
          $set: true,
        },
      });
    }
    case actionTypes.SET_IS_LOADING: {
      const { appLoading } = action.payload;

      return update(state, {
        appLoading: {
          $set: appLoading,
        },
      });
    }
    default: {
      return state;
    }
  }
};
