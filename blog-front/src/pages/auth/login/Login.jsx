import React, { useState } from "react";
import "./login.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../../redux/apiCalls/authCalls";
import { useSelector } from "react-redux";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "") return toast.error("Email is Required!");
    if (password === "") return toast.error("Password is Required!");
    dispatch(
      loginRequest(
        {
          email,
          password,
        },
        navigate
      )
    );
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form action="" className="login-form">
        <input
          type="email"
          placeholder="Email ..."
          onChange={(e) => setEmail(e.currentTarget.value)}
        />
        <input
          type="password"
          placeholder="Password ..."
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <button type="submit" className="loginbutton" onClick={onSubmit}>
          Login
        </button>
        <div className="footer-text">
          Don’t have an account yet? <Link to="/register">Register</Link> here
          to get started!
        </div>
      </form>
    </div>
  );
};
