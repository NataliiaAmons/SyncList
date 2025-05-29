import React, { useEffect, useState } from "react";
import "../../styles/add-product-form.css";

export default function EditItemForm({ toggleForm, item, refresh }) {
  const [editedName, setEditedName] = useState("");
  const [editedNotes, setEditedNotes] = useState("");
  const [newImage, setNewImage] = useState(null);
  const prevImage = item.image;

  const [deleteImage, setDeleteImage] = useState(false);

  const toggleDeleteImage = () => {
    setDeleteImage(!deleteImage);
  };

  useEffect(() => {
    setEditedName(item.name);
    setEditedNotes(item.notes);

    console.log(item);
  }, [item]);

  const handleImage = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleName = (e) => {
    setEditedName(e.target.value);
  };

  const handleNotes = (e) => {
    setEditedNotes(e.target.value);
  };

  const handleEditItem = async (e) => {
    e.preventDefault();

    if (!editedName.trim()) {
      alert("Please enter a product name.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("item_id", item.id_item);
      formData.append("name", editedName);
      formData.append("notes", editedNotes);
      formData.append("newImage", newImage);
      formData.append("prevImage", prevImage);
      formData.append("deleteImage", deleteImage);
      console.log("Edit item: ", formData);

      const res = await fetch("http://localhost:5000/edit-item", {
        method: "PATCH",
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
          value={editedName}
          onChange={handleName}
          required
        />
        <div className="add-prod-img">
          <label htmlFor="image">Edit product image</label>
          <input type="file" name="image" onChange={handleImage} />
        </div>
        <textarea
          className="add-prod-notes bg-light"
          name="notes"
          placeholder="Notes"
          rows="3"
          value={editedNotes}
          onChange={handleNotes}
        ></textarea>
        {prevImage ? (
          <div className="previous-image">
            <label>Previous picture</label>
            <div>
              <div onClick={toggleDeleteImage}>
                <i
                  className={`fa-solid fa-trash delete-icon ${
                    deleteImage ? "text-accent" : "text-dark-gray"
                  }`}
                  id="delete-icon"
                ></i>
              </div>
              <img
                src={`http://localhost:5000/uploads/${prevImage}`}
                alt="item"
              />
            </div>
          </div>
        ) : null}
        <button
          className="submit-btn bg-primary text-light"
          type="submit"
          onClick={handleEditItem}
        >
          Edit product
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
