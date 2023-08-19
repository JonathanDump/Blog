import { useNavigate } from "react-router-dom";
import formCl from "./AdminLogInForm.module.scss";

import React, { useState } from "react";

export default function AdminLogInForm() {
  const [inputData, setInputData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const body = { username: inputData.username, password: inputData.password };
    const API_URL = import.meta.env.VITE_API_ENDPOINT;
    const response = await fetch(`${API_URL}/admin/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    localStorage.setItem("token", result.token);

    console.log(result);
    navigate("/admin/posts");
  };

  return (
    <div className={formCl.formContainer}>
      <form onSubmit={(e) => handelSubmit(e)}>
        <input
          type="text"
          name="username"
          placeholder="username"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => handleChange(e)}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
