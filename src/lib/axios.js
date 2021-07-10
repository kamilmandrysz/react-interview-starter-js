import axios from "axios";

import { API_URL } from "config";

const API = axios.create({
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json",
  },
  baseURL: API_URL,
});

export default API;
