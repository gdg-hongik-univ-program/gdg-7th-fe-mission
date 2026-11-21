// 전체 상품 조회
export async function getProducts() {
  const response = await fetch('/data/products.json');

  if (!response.ok) {
    throw new Error(`상품 조회 실패 (${response.status})`);
  }

  return response.json();
}

// 상품명 단건 검색
export async function getProductByName() {
  const response = await fetch(
    '/data/products.json?itemName=${encodeURIComponent(itemName)}'
  );

  if (!response.ok) {
    throw new Error(`상품 검색 실패 (${response.status})`);
  }

  return response.json();
}

// 장바구니 상품 일괄 구매
export async function purchaseProducts(cart) {
  const response = await fetch('/data/products.json/purchase', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });

  if (!response.ok) {
    throw new Error(`상품 구매 실패 (${response.status})`);
  }

  return response.json();
}