import { useLoaderData } from "react-router-dom";
import postCl from "./Post.module.scss";
import React, { useEffect, useState } from "react";
import PostCard from "../../Components/PostCard/PostCard";

export async function loader({ params }) {
  console.log(params);
  const response = await fetch(`http://localhost:3000/posts/${params.id}`);
  const post = await response.json();
  return { post };
}

export default function Post() {
  // const [post, setPost] = useState({});
  // useEffect(() => {

  // }, []);
  const post = useLoaderData().post;
  console.log(post);
  return (
    <div className={postCl.post}>
      <PostCard post={post}></PostCard>
    </div>
  );
}
