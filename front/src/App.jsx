import { useState } from "react";
import app from "./App.module.scss";
import Header from "./Components/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className={app.app}>
      <Header />
      <div className={app.body}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
