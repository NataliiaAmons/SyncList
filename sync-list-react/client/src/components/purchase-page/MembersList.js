import React, { useRef } from "react";

export default function MembersList({ popupRef, members }) {
  const containerRef = useRef();

  return (
    <div
      ref={containerRef}
      className="members-list-container border-gray bg-light shadow-light-gray-corner"
    >
      {members.map((member) => {
        return (
          <div ref={popupRef} className="member-container border-bottom-gray">
            <img
              className="member-profile-picture border-gray"
              src={`http://localhost:5000/uploads/${member.profile_picture}`}
              alt="profile"
            />
            <div className="member-info">
              <p>{`${member.first_name} ${member.last_name}`}</p>
              <span className="text-dark-gray">@{member.username}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
