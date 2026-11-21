// 백엔드 개발자의 서버 주소로 변경
// 실제 예시 "http://192.168.0.15:8080"

const BASE_URL = "http://localhost:3001";

//내부적으로 사용
async function findByName(itemName) {
  const res = await fetch(
    `${BASE_URL}/products?itemName=${encodeURIComponent(itemName)}`,
  );
  if (!res.ok) throw new Error("상품 조회 실패");
  const [product] = await res.json();
  if (!product) throw new Error(`'${itemName}' 상품이 없습니다`);
  return product;
}

// GET: 전체 상품조회
export async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("상품 조회 실패");
  }

  return response.json();
}

// GET: 상품명 검색
export async function searchProduct(itemName) {
  const response = await fetch(
    `${BASE_URL}/products?itemName=${encodeURIComponent(itemName)}`,
  );

  if (!response.ok) {
    throw new Error("상품 검색 실패");
  }

  return response.json();
}

// POST: 장바구니 상품 일괄구매
// cart: [{ id: 1, count: 2 }, { id: 2, count: 1 }]
export async function purchaseProducts(cart) {
  for (const { id, count } of cart) {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error(`상품(id: ${id}) 조회 실패`);
    const p = await res.json();
    if (p.quantity < Number(count)) throw new Error(`${p.itemName} 재고 부족`);

    const patch = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: p.quantity - Number(count) }),
    });
    if (!patch.ok) throw new Error("상품 구매 실패");
  }
  return getProducts();
}

// POST: 상품등록
// product: { itemName, price, quantity, category }
export async function createProduct(product) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("상품 등록 실패");
  }

  return response.json();
}

// PATCH: 재고 추가
// stock: { itemName, quantity }
export async function addStock(stock) {
  const p = await findByName(stock.itemName);
  const response = await fetch(`${BASE_URL}/products/${p.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity: p.quantity + Number(stock.quantity) }),
  });

  if (!response.ok) {
    throw new Error("재고 추가 실패");
  }

  return response.json();
}

// DELETE: 상품 삭제
// endpoint: /admin/products
// body: { itemName }
export async function deleteProduct(itemName) {
  const p = await findByName(itemName);
  const response = await fetch(`${BASE_URL}/products/${p.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`상품 삭제 실패 (${response.status})`);
  }

  return getProducts(); // 남은 전체 목록
}
