import { redirect, useLoaderData } from "react-router-dom";
import postCl from "./Post.module.scss";
import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";
import Comment from "../../Components/Comment/Comment";

export async function loader({ params }) {
  console.log(params);
  const response = await fetch(`http://localhost:3000/${params.id}`);
  const post = await response.json();
  return { post };
}

export default function Post() {
  const [inputData, setInputData] = useState({ username: "", text: "" });
  const [rerender, setRerender] = useState(1);
  const [post, setPost] = useState(useLoaderData().post);
  // const { post } = useLoaderData();

  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      username: inputData.username,
      text: inputData.text,
    });
    console.log("body", body);
    await fetch(`http://localhost:3000/${post._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
    // console.log(response);
    // setRerender(rerender + 1);
    // setPost(useLoaderData().post);

    const response = await fetch(`http://localhost:3000/${post._id}`, {
      method: "GET",
    });
    const result = await response.json();
    setPost(result);
    setInputData({ username: "", text: "" });
  };

  console.log(inputData);
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
