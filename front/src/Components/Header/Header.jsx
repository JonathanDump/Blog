import header from "./Header.module.scss";

import React from "react";

export default function Header() {
  return (
    <div className={header.header}>
      <div className={header.logo}>This is my blog</div>
    </div>
  );
}
