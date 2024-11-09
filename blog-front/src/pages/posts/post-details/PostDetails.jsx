import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./postdetails.css";
import { toast } from "react-toastify";
import { Comment } from "../../../components/comment/Comment";

import { PostUpdate } from "../post-update/PostUpdate";
import { postDetailsRequest } from "../../../redux/apiCalls/authCalls";
export const PostDetails = () => {
  const [comment, setComment] = useState("");
  const [updatepost, setUpdatePost] = useState(false);
  const [commentrefrech, setCommentRefrech] = useState(false);
  const { id } = useParams();
  const { user, postdetail } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postDetailsRequest(id));
  }, [id, commentrefrech]);

  const onClickLike = async () => {
    const result = await axios.put(
      `http://localhost:4000/api/post/like/${id}`,
      {
        withCredentials: true,
      }
    );
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return toast.error("Comment can't be empty");
    try {
      const result = await axios.post(
        "http://localhost:4000/api/comment/",
        {
          postid: id,
          user: user?.id,
          text: comment,
          firstname: user?.firstname,
        },
        {
          withCredentials: true,
        }
      );

      if (result.status === 201) {
        setComment("");
        setCommentRefrech(true);
      }
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <div className="post-details">
      <h1 className="post-details-title">{postdetail?.title}</h1>
      <img src={postdetail?.image.url} alt="" className="post-details-image" />
      <div className="user-details">
        <i className="bi bi-person"></i>

        <Link to={`/profile/${postdetail?.user._id}`}>
          {postdetail?.user.firstname}
        </Link>
      </div>
      <div
        className="post-details-description"
        dangerouslySetInnerHTML={{ __html: postdetail?.description }}
      ></div>{" "}
      <div className="footer-section">
        <div className="like-section">
          <i className="bi bi-hand-thumbs-up"></i>
          {postdetail?.like.length}
          <span onClick={onClickLike}>like</span>
        </div>
        <div className="post-date">
          <i
            onClick={() => setUpdatePost(true)}
            className="bi bi-pencil pencil"
          ></i>

          <span>{postdetail?.createdAt.slice(0, 10)}</span>
        </div>
      </div>
      <div className="add-comment-section">
        <div className="comment-section">
          <h3 className="comment-title">Add a Comment</h3>
          <form className="comment-form">
            <textarea
              className="comment-textarea"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              cols="8"
            ></textarea>
            <button
              type="submit"
              className="comment-submit-button"
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </button>
          </form>
        </div>
        <h2>{postdetail?.Comments.length} Comments</h2>
        {postdetail?.Comments.map((p, i) => {
          return <Comment key={i} c={p} />;
        })}
      </div>
      {updatepost && (
        <PostUpdate
          setUpdatePost={setUpdatePost}
          post={postdetail}
          updatepost={updatepost}
          id={id}
        />
      )}
    </div>
  );
};
