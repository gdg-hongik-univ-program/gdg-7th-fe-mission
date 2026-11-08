import { useState } from "react";
import ItemList from "../components/ItemList";
import { itemData } from "../data/mockData";

// mockData에서 카테고리 종류만 뽑기 (중복 제거): 의류, 전자기기, 화장품, 식품
const categories = [...new Set(itemData.map((item) => item.category))];

function CategoryPage() {
  const [open, setOpen] = useState(false);     // 선택지 열림 여부
  const [selected, setSelected] = useState(""); // 선택된 카테고리

  // 선택된 카테고리가 있으면 그 상품만, 없으면 전체
  const filteredItems = selected
    ? itemData.filter((item) => item.category === selected)
    : itemData;

  const handleSelect = (category) => {
    setSelected(category);
    setOpen(false);
  };

  return (
    <main className="content">
      <div className="category-page">
        {/* 카테고리 선택 버튼 + 선택지 */}
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

        <ItemList items={filteredItems} />
      </div>
    </main>
  );
}

export default CategoryPage;