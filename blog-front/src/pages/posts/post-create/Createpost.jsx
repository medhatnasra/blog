import React, { useState, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "./createpost.css";

import { useDispatch } from "react-redux";
import { createPostRequest } from "../../../redux/apiCalls/authCalls";

export const Createpost = () => {
  const quillRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (title.trim() === "") return toast.error("Title is Required!");
    if (description.trim() === "")
      return toast.error("Description is Required!");
    if (category.trim() === "") return toast.error("Category is Required!");
    if (!file) return toast.error("Image is Required!");

    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", file);

    dispatch(createPostRequest(formData));
  };

  return (
    <div className="create-post-container">
      <h1 className="post-title">Create New Post</h1>
      <form action="" className="create-post">
        <input
          type="text"
          className="create-post-input"
          placeholder="Post Title"
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <ReactQuill
          ref={quillRef}
          placeholder="Write your post description here..."
          theme="snow"
          onChange={setDescription}
          value={description}
        />

        <input
          type="file"
          className="create-post-input"
          name="imageFile"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value)}
          defaultValue
        >
          <option value="">Select A Category</option>
          <option value="food">Food</option>
          <option value="music">Music</option>
          <option value="travel">Travel</option>
        </select>
        <button type="submit" className="createbutton" onClick={onSubmit}>
          Create
        </button>
      </form>
    </div>
  );
};
