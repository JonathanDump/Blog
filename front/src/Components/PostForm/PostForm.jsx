import { useNavigate } from "react-router-dom";
import { getJwtToken } from "../../functions/functions";
import postFormCl from "./PostForm.module.scss";

import React, { useState } from "react";

export default function PostForm({ method }) {
  const [inputValue, setInputValue] = useState({
    title: "",
    text: "",
    isVisible: true,
  });
  const [inputError, setInputError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "isVisible") {
      setInputValue({ ...inputValue, [e.target.name]: !inputValue.isVisible });
    } else {
      setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("method", method);
    const jwt = getJwtToken();
    const API_URL = import.meta.env.VITE_API_ENDPOINT;
    const body = inputValue;
    console.log("body", body);

    const response = await fetch(`${API_URL}/admin/posts/create-post`, {
      method: method,
      headers: {
        Authorization: jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    console.log("response", response);
    const result = await response.json();
    console.log("result", result);

    if (response.status >= 400) {
      setInputValue(result.post);
      setInputError(result.errors[0].msg);
      return;
    }
    console.log("post created");

    navigate("/admin/posts");
  };
  console.log(inputError);
  return (
    <div className={postFormCl.fromContainer}>
      <form className={postFormCl.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={postFormCl.inputContainer}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={inputValue.title}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className={postFormCl.inputContainer}>
          <label htmlFor="text">Text</label>
          <textarea
            type="text"
            name="text"
            value={inputValue.text}
            onChange={(e) => handleChange(e)}
            minLength="1"
          ></textarea>
          <div className={postFormCl.inputError}>{inputError}</div>
        </div>
        <div className={postFormCl.inputContainer}>
          <label htmlFor="isVisible">Is it visible?</label>
          <input
            type="checkbox"
            name="isVisible"
            checked={inputValue.isVisible}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
