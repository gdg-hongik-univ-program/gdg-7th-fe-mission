export const getProducts = async () => {
  const url = new URL('../data/products.json', import.meta.url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('상품 데이터를 불러오지 못했습니다.');
  }

  const data = await response.json();
  return data;
};