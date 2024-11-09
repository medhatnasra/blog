import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import axios from "axios";
import { logoutRequest } from "./redux/apiCalls/authCalls";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Set up Axios interceptor globally
const interceptor = axios.interceptors.response.use(
  (response) => response,
  async (err) => {
    const { dispatch } = store;
    if (err.response && err.response.data.message === "No Token Provided") {
      dispatch(logoutRequest()); // Dispatch the logout action
    }

    if (err.response && err.response.status === 401) {
      try {
        const refreshResponse = await axios.post(
          "http://localhost:4000/api/refreshtoken",
          {},
          { withCredentials: true }
        );

        return axios(err.config);
      } catch (error) {
        dispatch(logoutRequest());
      }
    }

    return Promise.reject(err);
  }
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
