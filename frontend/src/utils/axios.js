import axios from "axios";
import deleteCookie from "./Cookies/deleteCookie";
import getCookie from "./Cookies/getCookie";
import setCookie from "./Cookies/setCookie";
import jwtDecode from "jwt-decode";

const BASE_URL =
  process.env.NEXT_APP_API_BASE_URL ||
  "https://api-v1-hrdc-staging.merakitechs.com.np/";

const REFRESH_TOKEN_ENDPOINT = "api/v1/user-app/login/refresh";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (!window.navigator.onLine) {
    throw new Error("No Internet");
  } else {
    config.headers = {
      Authorization: getCookie("accessToken")
        ? `Bearer ${getCookie("accessToken")}`
        : "",
      "Content-Type": "application/json",
    };
    return config;
  }
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error === "No Internet") {
      console.log("No Internet");
    }
    //for handling CORS error
    else if (error.toJSON().message === "Network Error") {
      console.log("Network Error");
    }
    //for handling page not found
    else if (error.response?.status === 404) {
      console.log("Page Not Found");
    }
    //internal server error
    else if (error.response?.status === 500 || error.response?.status > 500) {
      console.log("Internal Server Error");
    }
    //to handle forbidden response status
    else if (error.response?.status === 403) {
      console.log("403");
    }

    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === REFRESH_TOKEN_ENDPOINT
    ) {
      throw new Error("UnAuthorized");
    }

    const value = {
      refresh: getCookie("refreshToken"),
    };

    if (error?.response?.status === 401 && !value?.refresh) {
      throw new Error("No cookies found, login failed!!");
    }
    if (error.response.status === 401 && value?.refresh) {
      deleteCookie("accessToken");
      try {
        const response = await axiosInstance.post(
          REFRESH_TOKEN_ENDPOINT,
          JSON.stringify(value)
        );
        const decodedToken = jwtDecode(response?.data?.access);
        const expTime = decodedToken.exp;
        const maxAge = expTime - Date.now() / 1000;
        if (response.status === 200) {
          if (maxAge <= 0) {
            // Check if the access token is expired
            throw new Error("Access token is expired");
          }
          setCookie("accessToken", response?.data?.access, {
            secure: true,
            maxAge: maxAge,
          });
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response?.data.access}`;
          window.location.reload();
          return axiosInstance(originalRequest);
        }
      } catch (error) {
        if (error.response.data.code === "token_not_valid") {
          throw new Error("Refresh token is not valid or expired");
        }
        throw new Error("Login fail");
      }
    }
    throw error;
  }
);
