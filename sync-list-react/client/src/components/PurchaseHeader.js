import React, { useEffect, useState, useRef } from "react";
import MembersList from "./MembersList";

export default function PurchaseHeader({ info, members }) {
  const deadlineDate = new Date(info.deadline);

  const [seenMembersList, setSeenMembersList] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleMembersList = () => {
    setSeenMembersList((prev) => !prev);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const clickedOutsidePopup =
        popupRef.current && !popupRef.current.contains(event.target);
      const clickedOutsideButton =
        buttonRef.current && !buttonRef.current.contains(event.target);

      if (clickedOutsidePopup && !clickedOutsideButton) {
        setSeenMembersList(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (info) {
    return (
      <div className="purchase-header bg-light border-gray text-dark shadow-light-gray-corner">
        <p className="purchase-name">{info.name}</p>
        <div className="purchase-due-date hover-neutral">
          <p>Due date:</p>
          <p className="due-date text-accent">
            {deadlineDate.toISOString().split("T")[0]}
          </p>
        </div>
        <div
          className="purchase-members hover-neutral"
          onClick={toggleMembersList}
        >
          <p>
            {members.length === 1 ? `1 member` : `${members.length} members`}
          </p>
          {seenMembersList && (
            <MembersList popupRef={popupRef} members={members} />
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="purchase-header bg-light border-gray text-dark">
        <p className="purchase-name">Purchase doesn`t exist</p>
      </div>
    );
  }
}
