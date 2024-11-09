import React, { useEffect, useState } from "react";
import "./header.css";
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { logoutRequest } from "../../redux/apiCalls/authCalls";
import { ToastContainer, toast } from "react-toastify";

export const Header = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [toggle, setToggle] = useState(false);

  return (
    <div className="header">
      <Link className="header-left" to="/">
        <span className="logo">
          Blog <i className="bi bi-pencil"></i>
        </span>
      </Link>
      <nav className="navbar">
        <ul className={toggle ? "navlinks active" : "navlinks"}>
          {isAuthenticated && (
            <>
              <Link className="navlink" to="/posts">
                <i className="bi bi-file-text"></i>
                <span>Posts</span>
              </Link>
              {user?.isAdmin && (
                <Link className="navlink" to="/admin-dashboard">
                  <i className="bi bi-speedometer2"></i>
                  <span>Admin Dashboard</span>
                </Link>
              )}
            </>
          )}
        </ul>
      </nav>
      <div className={toggle ? "header-right active" : "header-right"}>
        {!isAuthenticated && (
          <>
            <Link className="right-link" to="/login">
              <i className="bi bi-box-arrow-in-right"></i>
              <span>Login</span>
            </Link>
            <Link className="right-link" to="/register">
              <i className="bi bi-person-plus"></i>
              <span>Register</span>
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link
              className="right-link"
              onClick={() => dispatch(logoutRequest())}
            >
              <i className="bi bi-person-plus"></i>
              <span> Logout</span>
            </Link>
            <Link className="right-link" to="/post/create">
              <i className="bi bi-person-plus"></i>
              <span>Create Post</span>
            </Link>
            <Link className="right-link" to={`/profile/${user?.id}`}>
              <i className="bi bi-person"></i>
              <span>{user?.firstname}</span>
            </Link>
          </>
        )}
      </div>
      <div className="burger" onClick={() => setToggle(!toggle)}>
        {toggle ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};
