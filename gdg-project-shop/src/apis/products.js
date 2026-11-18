const BASE_URL = "";

export async function getProducts() {
  const response = await fetch(`${BASE_URL}/api/v1/products`);

  if (!response.ok) {
    throw new Error('상품 데이터를 불러오지 못했어요');
  }

  return await response.json();
}

export async function searchProduct(itemName) {
  const response = await fetch(`${BASE_URL}/api/v1/products?itemName=${encodeURIComponent(itemName)}`);
  if (!response.ok) {
    throw new Error('상품을 찾지 못했어요');
  }
  return await response.json();
}

export async function purchaseProducts(cart) {
  const response = await fetch(`${BASE_URL}/api/v1/products/purchase`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error('구매에 실패했어요');
  }
  return await response.json();
}

export async function createProduct(newProduct) {
  const response = await fetch(`${BASE_URL}/api/v1/admin/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  });
  if (!response.ok) {
    throw new Error('상품 등록에 실패했어요');
  }
  return await response.json();
}

export async function addStock(stockData) {
  const response = await fetch(`${BASE_URL}/api/v1/admin/products/stock`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(stockData),
  });
  if (!response.ok) {
    throw new Error('재고 추가에 실패했어요');
  }
  return await response.json();
}

export async function deleteProduct(deleteData) {
  const response = await fetch(`${BASE_URL}/api/v1/admin/products`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(deleteData),
  });
  if (!response.ok) {
    throw new Error('상품 삭제에 실패했어요');
  }
  return await response.json();
}