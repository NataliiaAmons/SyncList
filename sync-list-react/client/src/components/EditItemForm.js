import React, { useEffect, useState } from "react";
import "../styles/add-product-form.css";

export default function EditItemForm({ toggleForm, item }) {
  const [editedName, setEditedName] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [editedImage, setEditedImage] = useState("");

  useEffect(() => {
    setEditedName(item.name);
    setEditedNotes(item.notes);
    setEditedImage(item.image);
  }, [item]);

  const handleImage = (e) => {
    setEditedImage(e.target.files[0]);
  };

  const handleName = (e) => {
    setEditedName(e.target.value);
  };

  const handleNotes = (e) => {
    setEditedNotes(e.target.value);
  };

  const handleEditItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("item_id", item.item_id);
      formData.append("name", editedName);
      formData.append("notes", editedNotes);
      formData.append("image", editedImage);
      console.log("Edit item: ", formData);

      const res = await fetch("http://localhost:5000/edit-item", {
        method: "PATCH",
        body: formData,
      });

      const result = await res.text();
      console.log(result);
    } catch (err) {
      console.error(err);
    }
    toggleForm();
  };

  return (
    <div className="add-product-popup" id="add-product-popup">
      <form className="add-product-form bg-light border-gray">
        <input
          className="add-prod-name"
          type="text"
          placeholder="Product name"
          name="name"
          value={editedName}
          onChange={handleName}
          required
        />
        <div className="add-prod-img">
          <label htmlFor="image">Edit product image</label>
          <input type="file" name="image" onChange={handleImage} />
        </div>
        <textarea
          className="add-prod-notes"
          name="notes"
          placeholder="Notes"
          rows="3"
          value={editedNotes}
          onChange={handleNotes}
        ></textarea>
        <button
          className="submit-btn bg-primary text-light"
          type="submit"
          onClick={handleEditItem}
        >
          Edit product
        </button>
        <button className="cancel-btn" type="button" onClick={toggleForm}>
          Cancel
        </button>
      </form>
    </div>
  );
}
