import React from "react";
import { useGetPostsAdmin } from "../../hooks/useGetPostsAdmin";
import { Link, useLoaderData } from "react-router-dom";
import PostCard from "../../Components/PostCard/PostCard";

export async function loader() {
  const jwt = localStorage.getItem("token");
  //   const jwtData = jwt.split(".")[1];
  //     const decodedJwtData = JSON.parse(window.atob(jwtData));

  const API_URL = import.meta.env.VITE_API_ENDPOINT;
  const response = await fetch(`${API_URL}/admin/posts`, {
    headers: {
      Authorization: jwt,
      "Content-Type": "application/json",
    },
  });
  const responseData = await response.json();
  console.log(responseData);
  return responseData.posts;
}

export default function AdminPostList() {
  const posts = useLoaderData();
  console.log("posts in componetnt", posts);
  if (posts.length) {
    return (
      <div className="contentContainer">
        {posts.map((post) => {
          return (
            <Link to={`${post._id}`} key={post._id}>
              <PostCard post={post} isVisible={post.isVisible} />
            </Link>
          );
        })}
      </div>
    );
  }

  return <div className="contentContainer">There are no posts yet</div>;
}
