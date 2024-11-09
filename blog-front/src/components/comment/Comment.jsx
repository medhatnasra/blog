import React from "react";
import "./comment.css";

import { useSelector } from "react-redux";

export const Comment = ({ c }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="comment-container">
        <div className="user-profile">
          <i className="bi bi-person"></i>
          <strong>{c.username}</strong>
        </div>
        <div className="comment-text">
          <p>{c?.text}</p>
        </div>
        {c.user === user.id && <i className="bi bi-trash delete"></i>}
      </div>
    </>
  );
};
