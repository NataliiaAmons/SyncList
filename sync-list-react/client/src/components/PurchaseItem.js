import React from "react";

export default function PurchaseItem({ item }) {
  if (item) {
    return (
      <li className="li-container bg-light border-gray shadow-light-gray-corner hover-neutral">
        <div className="li-label-and-checkbox">
          <input
            className="checkbox"
            type="checkbox"
            id="task-checkbox"
            name="task-checkbox"
          />
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
