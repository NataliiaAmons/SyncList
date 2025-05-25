import React from "react";

export default function PurchaseHeader({ info, members }) {
  const deadlineDate = new Date(info.deadline);
  if (info) {
    return (
      <div className="purchase-header bg-light border-gray text-dark shadow-light-gray-corner">
        <p className="purchase-name">{info.name}</p>
        <div className="purchase-due-date">
          <p>Due date:</p>
          <p className="due-date text-accent">
            {deadlineDate.toISOString().split("T")[0]}
          </p>
        </div>
        <div className="purchase-members">
          <p>
            {members.length === 1 ? `1 member` : `${members.length} members`}
          </p>
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
