import React from "react";

export default function PurchaseItem({ item }) {
  if (item) {
    return (
      <li className="li-container bg-light border-gray">
        <div className="li-label-and-checkbox">
          <input
            className="checkbox"
            type="checkbox"
            id="task1-checkbox"
            name="task1-checkbox"
          />
          <label htmlFor="task1-checkbox">{item.name}</label>
        </div>
        <div className="claimed-by-info">
          <img
            className="claimed-by-profile-picture"
            src={`images/${item.profile_picture}`}
            alt="profile"
          />
          <span>{item.username}</span>
        </div>
        <img className="li-picture" src={`images/${item.image}`} alt="item" />
        <p className="li-notes">{item.notes}</p>
      </li>
    );
  }
}
