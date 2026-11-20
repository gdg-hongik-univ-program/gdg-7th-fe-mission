import ItemList from "../components/ItemList";
import LoadingMessage from "../messages/LoadingMessage";
import ErrorMessage from "../messages/ErrorMessage";
import {useProducts} from "../../hooks/useProducts";
import { useState } from "react";
// ...

function CategoryPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const { items, loading, error } = useProducts();

  

  // 불러온 데이터에서 카테고리 종류만 뽑기 (중복 제거)
  const categories = [...new Set(items.map((item) => item.category))];

  const filteredItems = selected
    ? items.filter((item) => item.category === selected)
    : items;

  const handleSelect = (category) => {
    setSelected(category);
    setOpen(false);
  };

  return (
    <main className="content">
      <div className="category-page">
        <div className="category-select">
          <button
            className="category-trigger"
            onClick={() => setOpen(!open)}
          >
            {selected || "카테고리 선택"}
          </button>

          {open && (
            <ul className="category-options">
              {categories.map((category) => (
                <li key={category}>
                  <button onClick={() => handleSelect(category)}>
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading ? (
          <LoadingMessage />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <ItemList items={filteredItems} />
        )}
      </div>
    </main>
  );
}

export default CategoryPage;