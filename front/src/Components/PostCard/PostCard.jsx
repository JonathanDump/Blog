import postCl from "./PostCard.module.scss";
import React from "react";

export default function PostCard({ post }) {
  const { title, text, date } = post;

  return (
    <div className={postCl.postCard}>
      <div className={postCl.title}>{title}</div>
      <div className={postCl.text}>{text}</div>
      <div className={postCl.date}>{date}</div>
    </div>
  );
}
