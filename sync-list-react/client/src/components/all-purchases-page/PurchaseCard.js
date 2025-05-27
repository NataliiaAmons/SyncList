import React from "react";
import "../../styles/weather-widget.css";
import "../../styles/purchase-folder.css";

export default function PurchaseCard({ purchase }) {
  const deadlineDate = new Date(purchase.deadline);

  if (purchase) {
    return (
      <div class="purchase bg-light border-gray shadow-light-gray-corner">
        <p class="purchase-name">{purchase.name}</p>
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
