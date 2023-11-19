import axios from "axios";
import { clearSession, getSession } from "./session";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor

instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const token = getSession();
    if (token && config.method !== "GET") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    if (error.response?.status === 401) {
      clearSession();

      if (
        error?.response?.data?.error?.message !== "Invalid email or password"
      ) {
        window.location = "/";
      }
    }
    if (error?.response?.data?.error?.message) {
      return Promise.reject(error.response.data.error.message);
    }
    console.log("Error:::", error);
    return Promise.reject(error);
  }
);

export default instance;
