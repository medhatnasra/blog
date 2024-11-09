import React, { useEffect, useState } from "react";
import "./register.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../../redux/apiCalls/authCalls";

export const Register = () => {
  const { registermessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirst] = useState("");
  const [lastname, setLast] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    if (firstname === "") return toast.error("Firstname is Required!");
    if (lastname === "") return toast.error("Lastname is Required!");
    if (email === "") return toast.error("email is Required!");
    if (password === "") return toast.error("password is Required!");

    // const fetchApi = async () => {
    //   try {
    //     const result = await axios.post("http://localhost:4000/api/register", {
    //       firstname: firstname,
    //       lastname: lastname,
    //       email: email,
    //       password: password,
    //     });
    //     if (result.status === 201) {
    //       toast.success("User Registred successfully", {
    //         onClose: () => {
    //           // Set a timeout after the toast disappears before navigating
    //           setTimeout(() => {
    //             navigate("/");
    //           }, 1000); // Adjust the timeout duration as needed (1000ms = 1 second)
    //         },
    //       });
    //     }
    //   } catch (err) {
    //     return toast.error(err.response.data.error);
    //   }
    // };
    // fetchApi();
    dispatch(
      registerRequest(
        {
          firstname,
          lastname,
          email,
          password,
        },
        navigate
      )
    );
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form action="" className="register-form">
        <input
          type="text"
          placeholder="Firstname ..."
          onChange={(e) => setFirst(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Lastname ..."
          onChange={(e) => setLast(e.currentTarget.value)}
        />
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
        <button type="submit" className="registerbutton" onClick={onSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};
