// 백엔드 개발자의 서버 주소로 변경 (예: "http://192.168.0.15:8080")
const BASE_URL = "";

// GET: 전체 상품 조회
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/data/products.json`);
  if (!response.ok) {
    throw new Error(`상품 조회 실패: ${response.status}`);
  }
  return response.json();
}

// GET: 상품명 검색
export async function searchProduct(itemName) {
  const response = await fetch(
    `${BASE_URL}/products?itemName=${encodeURIComponent(itemName)}`,
  );
  if (!response.ok) {
    throw new Error(`상품 검색 실패: ${response.status}`);
  }
  return response.json();
}

// POST: 장바구니 상품 일괄 구매
// cart: [{ id: 1, count: 2 }, { id: 2, count: 1 }]
export async function purchaseProducts(cart) {
  const response = await fetch(`${BASE_URL}/products/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });
  if (!response.ok) {
    throw new Error(`상품 구매 실패: ${response.status}`);
  }
  return response.json();
}

// POST: 상품 등록
// product: { itemName, price, quantity, category }
export async function createProduct(product) {
  const response = await fetch(`${BASE_URL}/admin/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!response.ok) {
    throw new Error(`상품 등록 실패: ${response.status}`);
  }
  return response.json();
}

// PATCH: 재고 추가
// stock: { itemName, quantity }
export async function addStock(stock) {
  const response = await fetch(`${BASE_URL}/admin/products/stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stock),
  });
  if (!response.ok) {
    throw new Error(`재고 추가 실패: ${response.status}`);
  }
  return response.json();
}

// DELETE: 상품 삭제 (남은 전체 상품 목록을 돌려줌)
// body: { itemName }
export async function deleteProduct(itemName) {
  const response = await fetch(`${BASE_URL}/admin/products`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemName }),
  });
  if (!response.ok) {
    throw new Error(`상품 삭제 실패: ${response.status}`);
  }
  return response.json();
}
