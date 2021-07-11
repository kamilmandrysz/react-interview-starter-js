import React, { useEffect } from "react";
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

const AccountProvider = ({ children }) => {
  const dispatch = useDispatch();
  const sessionID = Cookies.load(COOKIE_SID);
  const { loggedIn, loggedOut } = useSelector((state) => state.user);
  const { appLoading } = useSelector((state) => state.user);

  const getUserDetails = () => {
    fetchDetails().then((res) => {
      dispatch(setLoggedInAction(true));
      dispatch(setIsLoadingAction(false));
      dispatch(setDetailsAction(res.data));
    });
  };

  useEffect(() => {
    if (sessionID) {
      getUserDetails();
    } else {
      dispatch(setIsLoadingAction(false));
      dispatch(setLoggedInAction(false));
    }
  }, [dispatch, loggedIn, loggedOut, sessionID, getUserDetails]);

  return appLoading ? <p>loading</p> : children;
};

AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AccountProvider;
