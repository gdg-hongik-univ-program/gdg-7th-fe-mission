import { useState } from "react";
import ItemList from "../components/ItemList";

// 정렬 기준: 이름표(label)와 비교 방법(compare)
const sortOptions = [
  { label: "이름순 (가나다)", compare: (a, b) => a.itemName.localeCompare(b.itemName) },
  { label: "가격 낮은 순", compare: (a, b) => a.price - b.price },
  { label: "가격 높은 순", compare: (a, b) => b.price - a.price },
];

export default function SortPage({ products }) {
  const [selected, setSelected] = useState(null);   // 고른 정렬 기준
  const [isOpen, setIsOpen] = useState(false);      // 목록 열림 여부

  // 안 골랐으면 원래 순서, 골랐으면 복사해서 정렬
  const items = selected === null ? products : [...products].sort(selected.compare);

  function handleSelect(option) {
    setSelected(option);
    setIsOpen(false);
  }

  return (
    <section className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-12">
      {/* 정렬 기준 선택 창 */}
      <div className="relative w-48">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="h-10 w-full rounded-md border-2 border-black bg-white px-3 text-left text-sm"
        >
          {selected === null ? (
            <span className="text-gray-400">정렬 기준 선택</span>
          ) : (
            <span className="text-black">{selected.label}</span>
          )}
        </button>

        {isOpen && (
          <ul className="absolute left-0 top-full z-10 w-full">
            {sortOptions.map((option) => (
              <li key={option.label}>
                <button
                  onClick={() => handleSelect(option)}
                  className="h-10 w-full rounded-md border border-gray-400 bg-gray-200 px-3 text-left text-sm text-black"
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 상품 목록 */}
      <ItemList items={items} />
    </section>
  );
}