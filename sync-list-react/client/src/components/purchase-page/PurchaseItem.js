import React, { useState } from "react";
import EditItemForm from "./EditItemForm";

export default function PurchaseItem({ item, user_id, refresh }) {
  const [isChecked, setIsChecked] = useState(false);

  console.log("Header user_id: ", user_id);

  const [drop, setDrop] = useState(false);

  const [seenEditItemForm, setSeenEditItemForm] = useState(false);
  function toggleEditItemForm() {
    setSeenEditItemForm(!seenEditItemForm);
  }

  const handleCheckItem = async (e) => {
    setIsChecked(!isChecked);

    try {
      let res;

      if (item.id_claimed_by !== Number(user_id)) {
        const data = {
          item_id: item.id_item,
        };
        console.log(data);

        res = await fetch("http://localhost:5000/claim-item", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        });
      } else {
        const data = {
          item_id: item.id_item,
        };
        console.log(data);

        res = await fetch("http://localhost:5000/complete-item", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }

      const result = await res.text();
      console.log(result);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDropItem = async (e) => {
    setDrop(!drop);

    try {
      const data = {
        item_id: item.id_item,
      };
      console.log(data);

      const res = await fetch("http://localhost:5000/drop-item", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.text();
      console.log(result);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteItem = async (e) => {
    try {
      const data = {
        item_id: item.id_item,
      };
      console.log(data);

      const res = await fetch("http://localhost:5000/delete-item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.text();
      console.log(result);
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

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
            onChange={handleCheckItem}
            disabled={
              // disbled and transparent if claimed by other user
              // or completed by current user
              !(
                item.id_claimed_by == null ||
                item.id_claimed_by === Number(user_id)
              ) ||
              (item.id_claimed_by === Number(user_id) &&
                item.completed === true)
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
        <div className="manipulate-container">
          <i
            className="fa-solid fa-pen text-dark manipulate-icon"
            id="edit-icon"
            onClick={toggleEditItemForm}
          ></i>
          {seenEditItemForm ? (
            <EditItemForm
              toggleForm={toggleEditItemForm}
              item={item}
              refresh={refresh}
            />
          ) : null}

          <i
            className="fa-solid fa-trash text-dark manipulate-icon"
            id="delete-icon"
            onClick={handleDeleteItem}
          ></i>
        </div>
        {item.id_claimed_by === Number(user_id) && item.completed !== true && (
          <button
            type="button"
            className="unclaim-button bg-secondary"
            onClick={handleDropItem}
          >
            Drop
          </button>
        )}
      </li>
    );
  }
}
