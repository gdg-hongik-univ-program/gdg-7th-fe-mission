import ItemList from "../components/ItemList";
import LoadingMessage from "../messages/LoadingMessage";
import ErrorMessage from "../messages/ErrorMessage";
import {useProducts} from "../hooks/useProducts";
import { useState } from "react";

const sortOptions = [
  { value: "name", label: "이름(가나다순)" },
  { value: "high", label: "높은 가격순" },
  { value: "low", label: "낮은 가격순" },
];

function SortPage() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const { items, loading, error } = useProducts();


  // sort는 원본을 바꾸기 때문에 filter로 만든 복사본을 정렬
  const sortedItems = items
    .filter((item) => typeof item.price === "number")
    .sort((a, b) => {
      if (selected === "name") return a.itemName.localeCompare(b.itemName, "ko");
      if (selected === "high") return b.price - a.price;
      if (selected === "low") return a.price - b.price;
      return 0;
    });

  const handleSelect = (value) => {
    setSelected(value);
    setOpen(false);
  };

  const selectedLabel = sortOptions.find((o) => o.value === selected)?.label;

  return (
    <main className="content">
      <div className="sort-page">
        <div className="sort-select">
          <button className="sort-trigger" onClick={() => setOpen(!open)}>
            {selectedLabel || "정렬 기준 선택"}
          </button>

          {open && (
            <ul className="sort-options">
              {sortOptions.map((option) => (
                <li key={option.value}>
                  <button onClick={() => handleSelect(option.value)}>
                    {option.label}
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
          <ItemList items={sortedItems} />
        )}
      </div>
    </main>
  );
}

export default SortPage;