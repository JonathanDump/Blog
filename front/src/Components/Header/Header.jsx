import { NavLink, useParams } from "react-router-dom";
import cl from "./Header.module.scss";
import React from "react";

export default function Header() {
  const MatchedRoute = window.location.pathname.includes("/admin/posts");

  return (
    <div className={cl.header}>
      <div className={cl.logo}>This is my blog</div>
      {MatchedRoute && (
        <NavLink to="/admin/posts/create-post" className={cl.createPostButton}>
          Create post
        </NavLink>
      )}
    </div>
  );
}
