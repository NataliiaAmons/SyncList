import React, { useEffect, useState } from "react";
import ThemeSwitch from "./theme/ThemeSwitch";
import { useParams, Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [userInfo, setUserInfo] = useState(true);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const myData = location.state;

  const user_id = myData?.user_id;

  console.log("user_id", user_id);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/${user_id}/user-info`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        setUserInfo(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="header bg-support border-bottom-gray">
          <div className="left-section">
            <img className="logo-image" src="/logo.png" alt="logo" />
          </div>

          <div className="middle-section">
            <Link to={`/folders`} className="hover-light">
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
              src={`http://localhost:5000/uploads/${userInfo.profile_picture}`}
              alt="profile"
            />
            <p className="username-header text-dark">
              {userInfo.first_name} {userInfo.last_name}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
