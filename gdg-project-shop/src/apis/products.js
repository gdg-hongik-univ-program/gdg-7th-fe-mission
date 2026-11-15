export const getProducts = async () => {
  const res = await fetch("/data/products.json");

  if (!res.ok) {
    throw new Error("상품 데이터를 불러오지 못했습니다.");
  }

  return res.json();
};