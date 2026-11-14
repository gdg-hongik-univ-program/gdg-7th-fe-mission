import { useEffect, useState } from "react";
import ItemList from "../components/ItemList";
import { getProducts } from "../apis/products";
import LoadingMessage from "../messages/LoadingMessage";
import ErrorMessage from "../messages/ErrorMessage";

function PricePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [minInput, setMinInput] = useState("");
  const [maxInput, setMaxInput] = useState("");
  const [range, setRange] = useState({ min: null, max: null });
  const [error, setError] = useState(""); // 입력값 검증 에러

  useEffect(() => {
    let ignore = false;

    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        if (!ignore) setItems(data);
      } catch (e) {
        if (!ignore) setLoadError(e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    loadProducts();

    return () => {
      ignore = true;
    };
  }, []);

  const handleSearch = () => {
    const hasMin = minInput.trim() !== "";
    const hasMax = maxInput.trim() !== "";
    const min = hasMin ? Number(minInput) : null;
    const max = hasMax ? Number(maxInput) : null;

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

  const filteredItems = items.filter((item) => {
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

        {loading ? (
          <LoadingMessage />
        ) : loadError ? (
          <ErrorMessage message={loadError} />
        ) : (
          <ItemList items={filteredItems} />
        )}
      </div>
    </main>
  );
}

export default PricePage;