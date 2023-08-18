import postCl from "./PostCard.module.scss";
import React from "react";

export default function PostCard({ post, isVisible }) {
  console.log(isVisible);
  const { title, text, date } = post;
  const clName = isVisible
    ? postCl.postCard
    : `${postCl.postCard} ${postCl.invisible}`;

  return (
    <div className={isVisible === undefined ? postCl.postCard : clName}>
      <div className={postCl.row}>{title}</div>
      <div className={postCl.row}>{text}</div>
      <div className={postCl.row}>{date}</div>
    </div>
  );
}
