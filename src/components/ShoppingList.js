import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";  // Assuming you have ItemForm for adding new items
import Filter from "./Filter";      // Assuming you have Filter component for category filtering
import Item from "./Item";         // The Item component for displaying each item

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");  // State for the selected filter category
  const [items, setItems] = useState([]);  // State for the list of items
  const [loading, setLoading] = useState(false);  // Loading state to show loading indicator
  const [error, setError] = useState(null);  // Error state to handle errors during data fetching

  // Fetch items from the server when the component mounts
  useEffect(() => {
    setLoading(true);  // Set loading to true when fetching starts
    fetch("http://localhost:4000/items")
      .then((response) => response.json())  // Parse the JSON response
      .then((data) => {
        setItems(data);  // Set the fetched items in the state
        setLoading(false);  // Set loading to false when data is fetched
      })
      .catch((err) => {
        setError("Failed to load items.");  // Set error message if fetch fails
        setLoading(false);  // Set loading to false even if there is an error
      });
  }, []);  // Empty dependency array to run only once when the component mounts

  // Handle adding a new item
  function handleAddItem(newItem) {
    // Assuming newItem is the item object being added
    setItems((prevItems) => [...prevItems, newItem]);
  }

  // Handle adding/removing items from the cart (updating the item's `isInCart` status)
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setItems(updatedItems);
  }

  // Function to handle the deletion of an item
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  // Filter items based on selected category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;  // If "All" is selected, show all items
    return item.category === selectedCategory;   // Show only items matching the selected category
  });

  // Handle category change (Filter component)
  function handleCategoryChange(category) {
    setSelectedCategory(category);  // Set the selected category for filtering
  }

  return (
    <div className="ShoppingList">
      {/* Pass handleAddItem as a prop to ItemForm */}
      <ItemForm onAddItem={handleAddItem} />

      {/* Filter for changing categories */}
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* Loading and error handling */}
      {loading && <p>Loading items...</p>}
      {error && <p>{error}</p>}

      {/* Render the list of filtered items */}
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}  // Use item id as the key
            item={item}  // Pass item data to the Item component
            onUpdateItem={handleUpdateItem}  // Pass the update handler to the Item component
            onDeleteItem={handleDeleteItem}  // Pass the delete handler to the Item component
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
