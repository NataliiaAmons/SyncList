import React from "react";
import ThemeSwitch from "./theme/ThemeSwitch";
import { useParams, Link } from "react-router-dom";

export default function Header() {
  const { user_id } = useParams();
  const user = user_id;

  return (
    <div className="header bg-support border-bottom-gray">
      <div className="left-section">
        <img className="logo-image" src="/logo.png" alt="logo" />
      </div>

      <div className="middle-section">
        <Link to={`/${user_id}/folders`} className="hover-light">
          <p className="header-link text-dark">All lists</p>
        </Link>
        <p className="header-link text-dark">Claimed tasks</p>
        <p className="header-link text-dark">Upcoming</p>
        <p className="header-link text-dark">Friends</p>
      </div>

      <div className="right-section">
        <ThemeSwitch />
        <img
          className="profile-picture"
          src="/images/user-profile-picture.jpg"
          alt="profile"
        />
        <p className="username-header text-dark">Nataliia</p>
      </div>
    </div>
  );
}
