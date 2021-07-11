import Cookies from "react-cookies";
import { toastr } from "react-redux-toastr";

import API from "lib/axios";
import { USER_ENDPOINTS } from "constants/endpoints";

import * as actionTypes from "store/user/actionTypes";
import { TOASTR_OPTIONS } from "constants/toastr";

import { COOKIE_SID } from "utils/cookies";

export const setDetailsAction = (details) => ({
  type: actionTypes.SET_DETAILS,
  payload: {
    details,
  },
});

export const setLoggedInAction = (loggedIn) => ({
  type: actionTypes.SET_LOGGED_IN,
  payload: {
    loggedIn,
  },
});

export const setLogoutAction = () => ({
  type: actionTypes.LOGOUT,
});

export const setIsLoadingAction = (appLoading) => ({
  type: actionTypes.SET_IS_LOADING,
  payload: {
    appLoading,
  },
});

export const fetchDetails = () => {
  return API.get(USER_ENDPOINTS.DETAILS);
};

export const getDetails = () => {
  return (dispatch) => {
    fetchDetails().then((res) => {
      dispatch(setDetailsAction(res.data));
    });
  };
};

export const login = (data) => {
  return async (dispatch) => {
    const { user, access_token } = data;

    Cookies.save(COOKIE_SID, access_token, {});
    dispatch(setDetailsAction(user));
    dispatch(setLoggedInAction(true));

    toastr.success("Success", "Logged in successfully", { ...TOASTR_OPTIONS });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await dispatch(setLogoutAction());
    await dispatch(setLoggedInAction(false));

    Cookies.remove(COOKIE_SID);
    toastr.success("Success", "Logged out successfully", { ...TOASTR_OPTIONS });
  };
};
