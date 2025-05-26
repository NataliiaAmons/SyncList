import React, { useState } from "react";

export default function PurchaseItem({ item, user_id }) {
  const [isChecked] = useState(
    item.id_claimed_by === Number(user_id) && item.completed
  );

  if (item) {
    return (
      <li
        className={`border-gray shadow-light-gray-corner hover-neutral ${
          item.id_claimed_by == null ||
          (item.id_claimed_by === Number(user_id) && !item.completed) // not done by current user
            ? "bg-light"
            : "bg-light-gray"
        } ${
          item.notes == null ? "li-container-no-notes" : "li-container-notes"
        }`}
      >
        <div className="li-label-and-checkbox">
          <input
            className={`checkbox`}
            type="checkbox"
            id="task-checkbox"
            name="task-checkbox"
            checked={isChecked}
            disabled={
              // disbled and transparent if claimed by other user
              !(
                item.id_claimed_by == null ||
                item.id_claimed_by === Number(user_id)
              )
            }
          />
          <label htmlFor="task-checkbox">{item.name}</label>
        </div>

        {item.username ? (
          <div className="claimed-by-info">
            <img
              className="claimed-by-profile-picture border-gray"
              src={`http://localhost:5000/uploads/${item.profile_picture}`}
              alt="profile"
            />
            <span>{item.username}</span>
          </div>
        ) : null}

        {item.image ? (
          <img
            className="li-picture"
            src={`http://localhost:5000/uploads/${item.image}`}
            alt="item"
          />
        ) : null}

        <p className="li-notes">{item.notes}</p>

        {item.completed && (
          <i className="done-checkmark text-green fa-solid fa-check"></i>
        )}
      </li>
    );
  }
}
