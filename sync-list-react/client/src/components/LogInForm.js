import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/sign-up-and-log-in.css";

export default function LogInForm() {
  const [errMessage, setErrMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      console.log(res);
      const json = await res.json();

      if (!res.ok) {
        setErrMessage(json.message);
      } else {
        // on success
        const myData = { user_id: json.userId };
        navigate("/folders", { state: myData });
      }
    } catch (err) {
      console.error(err);
      setErrMessage("Network error, please try again.");
    }
  };
  return (
    <div className="body bg-neutral">
      <form
        onSubmit={handleSubmit}
        className="form-container  form-fields-flex log-in-flex-gap bg-light border-gray shadow-neutral-corner"
        id="log-in-form"
      >
        <div className="header bg-support border-bottomgray">
          <img className="logo-image" src="/logo.png" alt="logo" />
        </div>

        <h1 className="text-dark">Log in</h1>

        <div id="email-container" className="form-field">
          <input
            type="text"
            className="border-gray text-dark bg-neutral"
            id="email-or-usern"
            name="email"
            placeholder="Email or username"
            required
          />
        </div>

        <div id="password-container" className="form-field password-container">
          <input
            type="password"
            className="border-gray text-dark bg-neutral"
            id="pass"
            name="password"
            placeholder="Password"
            required
          />
          <i
            className="password-visibility-icon text-dark fa-regular fa-eye"
            id="fa-eye"
            onclick="changeVisibility('password-container')"
          ></i>
          <i
            className="hidden password-visibility-icon text-dark fa-regular fa-eye-slash"
            id="fa-eye-slash"
            onclick="changeVisibility('password-container')"
          ></i>
        </div>

        <label className="checkbox-container text-dark">
          <input type="checkbox" checked="checked" name="remember" /> Remember
          me
        </label>

        <p id="error" className="error error-center text-accent">
          {errMessage}
        </p>

        <button
          className="bg-primary text-light"
          id="submit-btn"
          type="submit"
          //disabled
        >
          Log in
        </button>

        <p className="sing-up-text text-dark">
          Don`t have an account?
          <Link className="text-primary" to="/sign-up">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
