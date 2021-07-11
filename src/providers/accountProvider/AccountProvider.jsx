import React, { useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "react-cookies";

import { COOKIE_SID } from "utils/cookies";

import {
  fetchDetails,
  setDetailsAction,
  setLoggedInAction,
  setIsLoadingAction,
} from "store/user/actions";

import AppLoader from "components/appLoader";

const AccountProvider = ({ children }) => {
  const dispatch = useDispatch();
  const sessionID = Cookies.load(COOKIE_SID);
  const { loggedIn, loggedOut } = useSelector((state) => state.user);
  const { appLoading } = useSelector((state) => state.user);

  const getUserDetails = useCallback(() => {
    fetchDetails().then((res) => {
      dispatch(setLoggedInAction(true));
      dispatch(setIsLoadingAction(false));
      dispatch(setDetailsAction(res.data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (sessionID) {
      getUserDetails();
    } else {
      dispatch(setIsLoadingAction(false));
      dispatch(setLoggedInAction(false));
    }
  }, [dispatch, loggedIn, loggedOut, sessionID, getUserDetails]);

  return appLoading ? <AppLoader /> : children;
};

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountProvider;
