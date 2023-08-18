import React from "react";
import PostCard from "../../Components/PostCard/PostCard";
import { useLoaderData } from "react-router-dom";
import Comment from "../../Components/Comment/Comment";

export async function loader({ params }) {
  console.log(params);
  const jwt = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_ENDPOINT;
  const response = await fetch(`${API_URL}/admin/posts/${params.id}`, {
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData;
}

export default function AdminPost() {
  const post = useLoaderData();
  return (
    <div className="contentContainer">
      <PostCard post={post} isAdmin={true} />
      <div className="comments">
        {post.commentsID.map((comment) => {
          return <Comment key={comment._id} comment={comment} isAdmin={true} />;
        })}
      </div>
    </div>
  );
}
