import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  // Handle the click for the "Add to Cart" / "Remove from Cart" button
  function handleAddToCartClick() {
    // Toggle the `isInCart` status and pass the updated item to the parent
    onUpdateItem({
      ...item,
      isInCart: !item.isInCart,  // Toggle the isInCart status
    });
  }

  // Handle the click for the "Delete" button
  function handleDeleteClick() {
    // Make the DELETE request to the server
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then(() => {
        // Notify the parent component that the item has been deleted
        onDeleteItem(item);
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>

      <button
        className={item.isInCart ? "remove" : "add"}
        onClick={handleAddToCartClick}
      >
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>

      {/* Delete button */}
      <button className="remove" onClick={handleDeleteClick}>
        Delete
      </button>
    </li>
  );
}

export default Item;
