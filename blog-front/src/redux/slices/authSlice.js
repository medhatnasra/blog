import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("XDUDUD")
    ? JSON.parse(localStorage.getItem("XDUDUD"))
    : null,
  isAuthenticated: localStorage.getItem("XNDUDUD") ? true : false,
  posts: null,
  profile: null,
  postdetail: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LoginSuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("XNDUDUD", "XNDUDUD");
    },
    postsFetch: (state, action) => {
      state.posts = action.payload;
    },
    successrefrechtoken: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    profilesucess: (state, action) => {
      state.profile = action.payload;
    },
    postdetailfetch: (state, action) => {
      state.postdetail = action.payload;
    },
  },
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
