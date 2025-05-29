import React, { useState } from "react";
import "../../styles/add-product-form.css";

export default function AddItemForm({ toggleForm, purchase_id, refresh }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter a product name.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("notes", notes);
      formData.append("purchase_id", purchase_id);
      formData.append("image", image);
      console.log(formData);

      const res = await fetch("http://localhost:5000/upload-item", {
        method: "POST",
        body: formData,
      });

      const result = await res.text();
      console.log(result);
      refresh();
    } catch (err) {
      console.error(err);
    }
    toggleForm();
  };

  return (
    <div className="add-product-popup" id="add-product-popup">
      <form className="add-product-form bg-light border-gray">
        <input
          className="add-prod-name bg-light"
          type="text"
          placeholder="Product name"
          name="name"
          onChange={handleName}
          required
        />
        <div className="add-prod-img">
          <label htmlFor="image">Add product image</label>
          <input type="file" name="image" onChange={handleImage} />
        </div>
        <textarea
          className="add-prod-notes bg-light"
          name="notes"
          placeholder="Notes"
          rows="3"
          onChange={handleNotes}
        ></textarea>
        <button
          className="submit-btn bg-primary text-light"
          type="submit"
          onClick={handleAddItem}
        >
          Add product
        </button>
        <button
          className="cancel-btn bg-gray"
          type="button"
          onClick={toggleForm}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
