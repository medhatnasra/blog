import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

export function registerRequest(user, navigate) {
  return async (dispatch) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/api/register",
        user
      );
      if (result.status === 201) {
        toast.success("User Registred successfully");
        navigate("/login");
      }
    } catch (err) {
      return toast.error(err.response?.data?.message);
    }
  };
}
export function logoutRequest() {
  return async (dispatch) => {
    await axios.post(
      "http://localhost:4000/api/logout",
      {},
      { withCredentials: true }
    );
    localStorage.removeItem("XNDUDUD");
    localStorage.removeItem("XDUDUD");
    window.location.reload();
  };
}

export function loginRequest(user, navigate) {
  return async (dispatch) => {
    try {
      const result = await axios.post("http://localhost:4000/api/login", user, {
        withCredentials: true,
      });

      if (result.status === 200) {
        dispatch(authActions.LoginSuccess(result.data?.user));
        localStorage.setItem("XDUDUD", JSON.stringify(result.data?.user));

        toast.success("Logged in successfully");
        navigate("/posts");
      }
    } catch (err) {
      return toast.error(err.response?.data?.message);
    }
  };
}

export function postRequest() {
  return async (dispatch) => {
    try {
      const result = await axios.get("http://localhost:4000/api/post/", {
        withCredentials: true,
      });
      dispatch(authActions.postsFetch(result.data));
    } catch (err) {
      if (!err.response?.data?.message === "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}

export function userProfileRequest(id) {
  return async (dispatch) => {
    try {
      const result = await axios.get(
        `http://localhost:4000/api/user/profile/${id}`,
        {
          withCredentials: true,
        }
      );
      dispatch(authActions.profilesucess(result.data));
    } catch (err) {
      if (!err.response?.data?.message === "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}

export function postDetailsRequest(id) {
  return async (dispatch) => {
    try {
      const result = await axios.get(`http://localhost:4000/api/post/${id}`, {
        withCredentials: true,
      });
      dispatch(authActions.postdetailfetch(result.data));
    } catch (err) {
      if (!err.response?.data?.message === "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}

export function createPostRequest(formData) {
  return async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/post/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
    } catch (err) {
      if (!err.response?.data?.message === "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}
