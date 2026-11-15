export async function getProducts() {
  const response = await fetch('/data/products.json');

  if (!response.ok) {
    throw new Error('상품 데이터를 불러오지 못했어요');
  }

  const data = await response.json();
  return data;
}