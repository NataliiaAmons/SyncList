import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/sign-up-and-log-in.css";
import "../styles/header.css";

export default function SignUpForm() {
  return (
    <form
      id="sign-up-form"
      className="form-container form-fields-flex sign-up-flex-gap bg-light border-gray shadow-neutral-corner"
    >
      <div className="header bg-support border-bottomgray">
        <img className="logo-image" src="/logo.png" alt="logo" />
      </div>

      <h1 className="text-dark">Sign up</h1>

      <div id="fname-container" className="form-field">
        <label className="field-label" for="fname">
          First name *
        </label>
        <input
          type="text"
          className="border-gray text-dark"
          id="fname"
          name="fname"
          placeholder="First name"
          required
        />
        <p id="fname-error" className="error text-accent"></p>
      </div>

      <div id="lname-container" className="form-field">
        <label className="field-label" for="lname">
          Last name *
        </label>
        <input
          type="text"
          className="border-gray text-dark"
          id="lname"
          name="lname"
          placeholder="Last name"
        />
        <p id="lname-error" className="error text-accent"></p>
      </div>

      <div id="uname-container" className="form-field">
        <label className="field-label" for="uname">
          Username *
        </label>
        <input
          type="text"
          className="border-gray text-dark"
          id="uname"
          name="uname"
          placeholder="Username"
        />
        <p id="uname-error" className="error text-accent"></p>
      </div>

      <div id="email-container" className="form-field">
        <label className="field-label" for="email">
          Email *
        </label>
        <input
          type="email"
          class="border-gray text-dark"
          id="email"
          name="email"
          placeholder="Email"
        />
        <p id="email-error" className="error text-accent"></p>
      </div>

      <div id="pass-container" className="form-field">
        <label className="field-label" for="pass">
          Password *
        </label>
        <div className="password-container" id="password-container-pass">
          <input
            type="password"
            className="border-gray text-dark"
            maxlength="50"
            id="pass"
            name="pass"
            placeholder="Password"
          />
          <i
            className="password-visibility-icon text-dark fa-regular fa-eye"
            id="fa-eye-pass"
            onclick="changeVisibility('password-container-pass')"
          ></i>
          <i
            className="hidden password-visibility-icon text-dark fa-regular fa-eye-slash"
            id="fa-eye-slash-pass"
            onclick="changeVisibility('password-container-pass')"
          ></i>
        </div>
        <p id="pass-error" className="error text-accent"></p>
        <ul id="pass-req-list" className="text-dark-gray">
          <li id="pass-li-min-len" className="visible">
            minimum 8 characters
          </li>
          <li id="pass-li-max-len" className="hidden text-accent">
            maximum 50 characters
          </li>
          <li id="pass-li-lowercase" className="visible">
            lowercase letters
          </li>
          <li id="pass-li-uppercase" className="visible">
            uppercase letters
          </li>
          <li id="pass-li-digit" className="visible">
            digits
          </li>
          <li id="pass-li-special-char" className="visible">
            character: #?!@$%^&*-
          </li>
        </ul>
      </div>

      <div id="cpass-container" className="form-field">
        <label className="field-label" for="cpass">
          Confirm password *
        </label>
        <div className="password-container" id="password-container-cpass">
          <input
            type="password"
            className="border-gray text-dark"
            maxlength="50"
            id="cpass"
            name="cpass"
            placeholder="Confirm password"
          />
          <i
            className="password-visibility-icon text-dark fa-regular fa-eye"
            id="fa-eye-cpass"
            onclick="changeVisibility('password-container-cpass')"
          ></i>
          <i
            className="hidden password-visibility-icon text-dark fa-regular fa-eye-slash"
            id="fa-eye-slash-cpass"
            onclick="changeVisibility('password-container-cpass')"
          ></i>
        </div>
        <p id="cpass-error" className="error text-accent"></p>
      </div>

      <button
        className="bg-primary text-light"
        id="submit-btn"
        type="submit"
        disabled
      >
        Create an account
      </button>

      <p className="sing-up-text text-dark">
        Already have an account?
        <Link class="text-primary" to="/">
          Log in
        </Link>
      </p>
    </form>
  );
}
