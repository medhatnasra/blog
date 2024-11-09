import React from "react";
import "./postitem.css";
import { Link } from "react-router-dom";

export const Postitem = ({ postitem }) => {
  return (
    <div className="postitem">
      <img src={postitem.image.url} alt="" />
      <div className="text-part">
        <Link to={`/post/details/${postitem._id}`}>{postitem.title}</Link>
        <p dangerouslySetInnerHTML={{ __html: postitem.description }}></p>
        <div className="category-link">
          <Link to={`/posts/${postitem.category}`}>{postitem.category}</Link>
        </div>
      </div>
    </div>
  );
};
