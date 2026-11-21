import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { toast } from "react-toastify";
import { authActions } from "../slices/authSlice";

// Optional: Create an axios instance so you don't repeat withCredentials: true
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export function registerRequest(user, navigate) {
  return async (dispatch) => {
    try {
      const result = await api.post("/register", user);
      if (result.status === 201) {
        toast.success("User Registered successfully");
        navigate("/login");
      }
    } catch (err) {
      return toast.error(err.response?.data?.message);
    }
  };
}

export function logoutRequest() {
  return async (dispatch) => {
    await api.post("/logout", {});
    localStorage.removeItem("XNDUDUD");
    localStorage.removeItem("XDUDUD");
    window.location.reload();
  };
}

export function loginRequest(user, navigate) {
  return async (dispatch) => {
    try {
      const result = await api.post("/login", user);

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
      const result = await api.get("/post/");
      dispatch(authActions.postsFetch(result.data));
    } catch (err) {
      if (err.response?.data?.message !== "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}

export function userProfileRequest(id) {
  return async (dispatch) => {
    try {
      const result = await api.get(`/user/profile/${id}`);
      dispatch(authActions.profilesucess(result.data));
    } catch (err) {
      if (err.response?.data?.message !== "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}

export function postDetailsRequest(id) {
  return async (dispatch) => {
    try {
      const result = await api.get(`/post/${id}`);
      dispatch(authActions.postdetailfetch(result.data));
    } catch (err) {
      if (err.response?.data?.message !== "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}

export function createPostRequest(formData) {
  return async () => {
    try {
      await api.post("/post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      if (err.response?.data?.message !== "Invalid Token") {
        return toast.error(err.response?.data?.message);
      }
    }
  };
}
