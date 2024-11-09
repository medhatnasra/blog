import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../redux/apiCalls/authCalls";

// const JWTInter = axios.create({
//   baseURL: "http://localhost:4000/api",
//   withCredentials: true, // For handling cookies
// });

const JWTinterceptor = (dispatch) => {
  axios.interceptors.response.use(
    (response) => {
      console.log("medhat");
    },
    async (err) => {
      console.log(err);
      if (err.response.status === 401) {
        try {
          await axios.post(
            "http://localhost:4000/api/refreshtoken",
            {},
            { withCredentials: true }
          );
        } catch (err) {
          dispatch(logoutRequest());
        }
      }
      return axios(err.config);
    }
  );
};

export default JWTinterceptor;
