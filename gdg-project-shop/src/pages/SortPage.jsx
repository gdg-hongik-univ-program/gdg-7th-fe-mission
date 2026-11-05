import { useState } from "react";
import Item from "../components/Item.jsx";
import { itemData } from "../data/mockData.js";

function SortPage({ cart, onAddToCart }) {
  const [sortOrder, setSortOrder] = useState("default");

  const sortedItems = [...itemData];

  if (sortOrder === "name") {
    sortedItems.sort((a, b) => a.itemName.localeCompare(b.itemName, "ko"));
  } else if (sortOrder === "low") {
    sortedItems.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high") {
    sortedItems.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 p-6">
      <select
        value={sortOrder}
        onChange={(event) => setSortOrder(event.target.value)}
        className="w-48 rounded-md border border-gray-300 px-3 py-2"
      >
        <option value="default">기본순</option>
        <option value="name">이름순</option>
        <option value="low">가격 낮은순</option>
        <option value="high">가격 높은순</option>
      </select>

      {sortedItems.map((item) => (
        <Item
          key={item.id}
          id={item.id}
          itemName={item.itemName}
          price={item.price}
          quantity={item.quantity}
          cart={cart}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default SortPage;