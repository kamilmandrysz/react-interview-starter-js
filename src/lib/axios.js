import axios from "axios";
import { toastr } from "react-redux-toastr";
import Cookies from "react-cookies";

import { store } from "store/store";

import { API_URL } from "config";

import { logout } from "store/user/actions";

import { COOKIE_SID } from "utils/cookies";

const API = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
  baseURL: API_URL,
});

API.interceptors.request.use(
  (request) => {
    const token = Cookies.load(COOKIE_SID);
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response || false;

    if (status && status === 401) {
      toastr.error(
        "Something went wrong",
        "You are not logged in or your session has expired. Please log in again."
      );

      store.dispatch(logout());

      Cookies.remove(COOKIE_SID);
    }

    return Promise.reject(error);
  }
);

export default API;
