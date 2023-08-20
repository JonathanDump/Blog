import { NavLink, useNavigate } from "react-router-dom";
import { format } from "date-fns";

import postCl from "./PostCard.module.scss";
import React from "react";

export default function PostCard({ post, isAdmin }) {
  const navigate = useNavigate();
  const { title, text, date, isEdited, _id, isVisible } = post;
  const formattedDate = format(new Date(date), "dd-MM-yyyy");
  const clName = isVisible
    ? postCl.postCard
    : `${postCl.postCard} ${postCl.invisible}`;
  const jwt = localStorage.getItem("token");
  const API_URL = import.meta.env.VITE_API_ENDPOINT;

  const handleDeleteClick = async () => {
    await fetch(`${API_URL}/admin/posts/${_id}`, {
      method: "DELETE",
      body: JSON.stringify({ postID: _id }),
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
    });
    navigate("/admin/posts");
  };

  return (
    <div className={clName}>
      <div className={postCl.title}>{title}</div>
      <div className={postCl.text}>{text}</div>
      <div className={postCl.date}>
        {isEdited ? `Edited: ${formattedDate}` : formattedDate}
      </div>
      {isAdmin && (
        <div className={postCl.buttonsContainer}>
          <NavLink to={`/admin/posts/${_id}/update`} className="button ">
            Update
          </NavLink>
          <button
            type="button"
            onClick={handleDeleteClick}
            className="button delete"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
