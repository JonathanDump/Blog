import React, { useEffect, useState } from "react";
import { useGetPostsAdmin } from "../../hooks/useGetPostsAdmin";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import PostCard from "../../Components/PostCard/PostCard";

export async function loader() {
  const jwt = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_ENDPOINT;
  const response = await fetch(`${API_URL}/admin/posts`, {
    headers: {
      Authorization: jwt,
    },
  });
  const responseData = await response.json();
  console.log("responseData", responseData);
  return responseData.posts;
}

export default function AdminPostList() {
  const posts = useLoaderData();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/admin/posts/create-post`);
  };

  return (
    <div className="contentContainer">
      <button type="button" onClick={handleClick}>
        Create post
      </button>
      {posts.length
        ? posts.map((post) => {
            return (
              <Link to={`${post._id}`} key={post._id}>
                <PostCard post={post} />
              </Link>
            );
          })
        : "There are no posts yet"}
    </div>
  );
}
