import { useState } from "react";
import Item from "../components/Item.jsx";

const categories = ["의류", "전자기기", "화장품", "식품"];

function CategoryPage({ products, cart, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems =
    selectedCategory === ""
      ? products
      : products.filter((item) => item.category === selectedCategory);

  function handleSelect(category) {
    setSelectedCategory(category === selectedCategory ? "" : category);
    setIsOpen(false);
  }

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-6 p-6">
      <div className="relative w-56">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full rounded-lg border border-black px-4 py-2 text-left text-gray-500"
        >
          {selectedCategory || "카테고리 선택"}
        </button>

        {isOpen && (
          <div className="absolute left-0 top-full z-10 w-full">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleSelect(category)}
                className="w-full rounded-lg border border-gray-400 bg-gray-200 px-4 py-2 text-left"
              >
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      {filteredItems.map((item) => (
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

export default CategoryPage;