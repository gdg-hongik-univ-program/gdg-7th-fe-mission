import { useState } from "react";
import ItemList from "../components/ItemList";
import { itemData } from "../data/mockData";

function PricePage() {
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");
  const [range, setRange] = useState({ min: null, max: null }); // 검색 버튼을 눌렀을 때 적용되는 범위
  const [error, setError] = useState("");

  const handleSearch = () => {
    const hasMin = minInput.trim() !== "";
    const hasMax = maxInput.trim() !== "";
    const min = hasMin ? Number(minInput) : null;
    const max = hasMax ? Number(maxInput) : null;

    // 잘못된 입력 검사
    if ((hasMin && Number.isNaN(min)) || (hasMax && Number.isNaN(max))) {
      setError("가격은 숫자로 입력해주세요.");
      return;
    }
    if ((hasMin && min < 0) || (hasMax && max < 0)) {
      setError("가격은 0원 이상으로 입력해주세요.");
      return;
    }
    if (hasMin && hasMax && min > max) {
      setError("최소 가격이 최대 가격보다 클 수 없어요.");
      return;
    }

    setError("");
    setRange({ min, max });
  };

  // 비어 있는 쪽은 제한 없음으로 처리
  const filteredItems = itemData.filter((item) => {
    const overMin = range.min === null || item.price >= range.min;
    const underMax = range.max === null || item.price <= range.max;
    return overMin && underMax;
  });

  return (
    <main className="content">
      <div className="price-page">
        <div className="price-search">
          <input
            type="number"
            min="0"
            placeholder="최소 가격"
            value={minInput}
            onChange={(e) => setMinInput(e.target.value)}
          />
          <input
            type="number"
            min="0"
            placeholder="최대 가격"
            value={maxInput}
            onChange={(e) => setMaxInput(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
        </div>

        {error && <p className="price-error">{error}</p>}

        {filteredItems.length > 0 ? (
          <ItemList items={filteredItems} />
        ) : (
          <p className="price-empty">해당 가격 범위의 상품이 없습니다.</p>
        )}
      </div>
    </main>
  );
}

export default PricePage;