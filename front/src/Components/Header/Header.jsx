import { NavLink, useParams } from "react-router-dom";
import cl from "./Header.module.scss";
import React from "react";

export default function Header() {
  const MatchedRoute = window.location.pathname.includes("/admin/posts");
  const destination = MatchedRoute ? "/admin/posts" : "/";
  return (
    <div className={cl.header}>
      <NavLink to={destination} className={cl.logo}>
        {" "}
        This is my blog
      </NavLink>

      {MatchedRoute && (
        <NavLink to="/admin/posts/create-post" className={cl.createPostButton}>
          Create post
        </NavLink>
      )}
    </div>
  );
}
