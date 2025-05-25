import React from "react";
import { useSearchParams } from "react-router-dom";

export default function PurchaseItem({ item, user_id }) {
  if (item) {
    return (
      <li
        className={`li-container border-gray shadow-light-gray-corner hover-neutral ${
          item.id_claimed_by == null || item.id_claimed_by === Number(user_id)
            ? "bg-light"
            : "bg-light-gray"
        } `}
      >
        <div className="li-label-and-checkbox">
          {(item.id_claimed_by == null ||
            item.id_claimed_by === Number(user_id)) && (
            <input
              className="checkbox"
              type="checkbox"
              id="task-checkbox"
              name="task-checkbox"
            />
          )}
          <label htmlFor="task-checkbox">{item.name}</label>
        </div>

        {item.username ? (
          <div className="claimed-by-info">
            <img
              className="claimed-by-profile-picture"
              src={`images/${item.profile_picture}`}
              alt="profile"
            />
            <span>{item.username}</span>
          </div>
        ) : null}

        {item.image ? (
          <img className="li-picture" src={`images/${item.image}`} alt="item" />
        ) : null}

        <p className="li-notes">{item.notes}</p>
      </li>
    );
  }
}
