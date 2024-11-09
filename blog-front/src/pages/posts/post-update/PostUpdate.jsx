import React, { useEffect, useState } from "react";
import "./postupdate.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export const PostUpdate = ({ setUpdatePost, post, updatepost, id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    setTitle(post?.title || "");
    setDescription(post?.description || "");
    setCategory(post?.category || "");
  }, [post]);
  const onUpdateSubmit = async (e) => {
    e.preventDefault();
    console.log(title);
    console.log(description);
    console.log(category);
    const result = await axios.put(
      `http://localhost:4000/api/post/${id}`,
      {
        title: title,
        description: description,
        category: category,
      },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <div className="post-update">
      <form
        className={updatepost ? `post-update-form show` : `post-update-form`}
      >
        <i
          className="bi bi-x close-icon"
          onClick={() => setUpdatePost(false)}
        ></i>

        <div className="input-field">
          <label> Post Title : </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <div className="input-field">
          <label> Post Description : </label>
          <ReactQuill
            placeholder="Write your post description here..."
            theme="snow"
            value={description}
            onChange={(value) => setDescription(value)}
          />
        </div>
        <div className="input-field">
          <label>Select Category : </label>
          <select
            className="create-post-input"
            value={category}
            onChange={(e) => setCategory(e.currentTarget.value)}
            defaultValue
          >
            <option>Select A Category</option>
            <option value="food">Food</option>
            <option value="music">Music</option>
            <option value="food">Travel</option>
          </select>
        </div>
        <div className="submit-button-container">
          <button
            type="submit"
            className="updatebutton"
            onClick={onUpdateSubmit}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
