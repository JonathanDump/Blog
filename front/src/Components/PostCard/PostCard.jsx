import { useNavigate } from "react-router-dom";
import { reducer } from "../../functions/reducer";
import postCl from "./PostCard.module.scss";
import React, { useReducer } from "react";

export default function PostCard({ post, isAdmin }) {
  const [result, dispatch] = useReducer(reducer);
  const navigate = useNavigate();
  const { title, text, date, isEdited, _id, isVisible } = post;
  const clName = isVisible
    ? postCl.postCard
    : `${postCl.postCard} ${postCl.invisible}`;
  const jwt = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_ENDPOINT;

  const handleUpdateClick = () => {
    navigate(`/admin/posts/${post._id}/update`);
  };
  const handleDeleteClick = async () => {
    await fetch(`${API_URL}/admin/posts/${post._id}`, {
      method: "DELETE",
      body: JSON.stringify({ postID: post._id }),
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    });
    navigate("/admin/posts");
  };

  return (
    <div className={clName}>
      <div className={postCl.row}>{title}</div>
      <div className={postCl.row}>{text}</div>
      <div className={postCl.row}>{isEdited ? `Edited: ${date}` : date}</div>
      {isAdmin && (
        <div className={postCl.buttonsContainer}>
          <button type="button" onClick={handleUpdateClick}>
            Update
          </button>
          <button type="button" onClick={handleDeleteClick}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
