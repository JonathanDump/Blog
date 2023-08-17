import postCl from "./PostCard.module.scss";
import React from "react";

export default function PostCard({ post }) {
  const { title, text, date } = post;

  return (
    <div className={postCl.postCard}>
      <div className={postCl.row}>{title}</div>
      <div className={postCl.row}>{text}</div>
      <div className={postCl.row}>{date}</div>
    </div>
  );
}
