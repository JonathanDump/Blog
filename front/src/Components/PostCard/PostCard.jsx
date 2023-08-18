import { reducer } from "../../functions/reducer";
import postCl from "./PostCard.module.scss";
import React, { useReducer } from "react";

export default function PostCard({ post, isVisible, isAdmin }) {
  // const [result, dispatch] = useReducer(reducer);
  console.log(isVisible);
  const { title, text, date, isModified } = post;
  const clName = isVisible
    ? postCl.postCard
    : `${postCl.postCard} ${postCl.invisible}`;

  return (
    <div className={isVisible === undefined ? postCl.postCard : clName}>
      <div className={postCl.row}>{title}</div>
      <div className={postCl.row}>{text}</div>
      <div className={postCl.row}>
        {isModified ? `Modified: ${date}` : date}
      </div>
      {isAdmin && (
        <div className={postCl.buttonsContainer}>
          <button type="button">Update</button>
          <button type="button">Delete</button>
        </div>
      )}
    </div>
  );
}
