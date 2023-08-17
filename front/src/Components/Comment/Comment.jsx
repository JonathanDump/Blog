import commentCl from "./Comment.module.scss";

import React from "react";

export default function Comment({ comment }) {
  return (
    <div className={commentCl.comment}>
      <div className={commentCl.row}>{comment.username}</div>
      <div className={commentCl.row}>{comment.text}</div>
      <div className={commentCl.row}>{comment.date}</div>
    </div>
  );
}
