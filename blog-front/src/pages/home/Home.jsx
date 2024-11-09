import React from "react";
import { Link } from "react-router-dom";
import "./home.css";
import { useSelector } from "react-redux";

export const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="home-container">
      <h1 className="welcome-title">Welcome to Our Blog</h1>
      <p className="welcome-message">
        Discover insightful articles and join our community.
      </p>
      {!isAuthenticated && (
        <Link to="/register">
          <button className="get-started-btn">Get Started</button>
        </Link>
      )}
    </div>
  );
};
