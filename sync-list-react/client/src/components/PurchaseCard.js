import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/weather-widget.css";
import "../styles/purchase-folder.css";

export default function PurchaseCard({ purchase, user_id }) {
  const deadlineDate = new Date(purchase.deadline);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/purchase?id=${purchase.id_purchase}&user=${user_id}`);
  };

  if (purchase) {
    return (
      <div class="purchase bg-light border-gray shadow-light-gray-corner">
        <p class="purchase-name" onClick={handleClick}>
          {purchase.name}
        </p>
        <p class="purchase-members">
          {purchase.members.length === 1
            ? `1 member`
            : `${purchase.members.length} members`}
        </p>
        <p class="purchase-deadline text-accent">
          <span class="deadline-label">Deadline: </span>
          {deadlineDate.toISOString().split("T")[0]}
        </p>
      </div>
    );
  }
}
