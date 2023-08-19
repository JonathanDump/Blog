import React from "react";

import { Link, useLoaderData } from "react-router-dom";
import PostCard from "../../Components/PostCard/PostCard";
import cl from "./AdminPostList.module.scss";

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

  return (
    <div className="contentContainer">
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
