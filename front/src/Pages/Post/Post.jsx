import { redirect, useLoaderData } from "react-router-dom";
import postCl from "./Post.module.scss";
import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import Comment from "../../Components/Comment/Comment";

export async function loader({ params }) {
  const API_URL = import.meta.env.VITE_API_ENDPOINT;
  const response = await fetch(`${API_URL}/${params.id}`);
  const post = await response.json();
  return post;
}

export default function Post() {
  const [inputData, setInputData] = useState({ username: "", text: "" });
  const [post, setPost] = useState(useLoaderData());

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_ENDPOINT;
    const body = JSON.stringify({
      username: inputData.username,
      text: inputData.text,
    });

    const response = await fetch(`${API_URL}/${post._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const result = await response.json();
    setPost(result);
    setInputData({ username: "", text: "" });
  };

  return (
    <div className={postCl.post}>
      <PostCard post={post}></PostCard>
      <div className={postCl.comments}>
        {post.commentsID.map((comment) => {
          return <Comment key={comment._id} comment={comment}></Comment>;
        })}
      </div>
      <form className={postCl.commentForm} onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="username"
          className={postCl.input}
          placeholder="Username"
          value={inputData.username}
          onChange={(e) => handleChange(e)}
        />
        <textarea
          name="text"
          id="commentText"
          cols="30"
          rows="10"
          placeholder="write your comment"
          value={inputData.text}
          onChange={(e) => handleChange(e)}
        ></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
