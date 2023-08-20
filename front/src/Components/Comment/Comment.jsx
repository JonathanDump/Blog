import commentCl from "./Comment.module.scss";
import { useParams } from "react-router-dom";
import React from "react";
import { format } from "date-fns";

export default function Comment({ comment, isAdmin, setPost }) {
  const postID = useParams().id;
  const formattedDate = format(new Date(comment.date), "dd-MM-yyyy");
  const handleClick = async () => {
    const API_URL = import.meta.env.VITE_API_ENDPOINT;
    const jwt = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/admin/posts/${postID}/comment/delete`,
      {
        method: "DELETE",
        body: JSON.stringify({ commentID: comment._id }),
        headers: {
          Authorization: jwt,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    console.log("comment delete result", result);
    setPost(result);
  };
  return (
    <div className={commentCl.comment}>
      <div className={commentCl.row}>
        {comment.username === "" ? "Anonymous" : comment.username}
      </div>
      <div className={commentCl.row}>{comment.text}</div>
      <div className={commentCl.date}>{formattedDate}</div>
      {isAdmin && (
        <button
          type="button"
          className={commentCl.delete}
          onClick={handleClick}
        >
          ×
        </button>
      )}
    </div>
  );
}
