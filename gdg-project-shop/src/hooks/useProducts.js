import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../apis/products.js";

// 상품 목록 + 로딩/에러 상태 + 다시 불러오기(refresh)를 묶은 Custom Hook
export function useProducts() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 서버에서 상품 목록을 다시 받아와 item state를 갱신
  const refresh = useCallback(async () => {
    const products = await getProducts();
    setItem(products);
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        await refresh();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [refresh]);

  return { item, loading, error, refresh };
}
