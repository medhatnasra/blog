import React, { useEffect } from "react";
import "./postpage.css";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Postitem } from "../../../components/post/Postitem";
import { postRequest } from "../../../redux/apiCalls/authCalls";

export const PostPage = () => {
  const { posts } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postRequest());
  });

  return (
    <div className="post">
      <h3>Last Posts</h3>
      <div className="post-section">
        <div className="last-post-section">
          {posts?.map((item) => (
            <Postitem postitem={item} key={item._id} />
          ))}
        </div>
        <div className="categories-section">
          <h3>Categories</h3>
          {posts?.map((item) => (
            <Link to={`/posts/${item.category}`} key={item._id}>
              {item.category}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
