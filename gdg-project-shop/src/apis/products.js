// 상품 목록 조회
// 백엔드 연결 시 이 파일의 URL/요청 방식만 수정하면 됩니다.
export async function getProducts() {
  const response = await fetch("/products");

  if (!response.ok) {
    throw new Error(`상품을 불러오지 못했어요. (${response.status})`);
  }

  // 파일이 없으면 Vite가 index.html(HTML)을 돌려주므로 JSON인지 확인
 /* const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    throw new Error("상품 데이터를 찾을 수 없어요. 파일 경로를 확인해주세요.");
  }*/

  return response.json();
}

// 상품명으로 단건 검색
export async function getProductByName(itemName) {
  const response = await fetch(
    `/products?itemName=${encodeURIComponent(itemName)}`
  );

  if (!response.ok) {
    throw new Error(`상품 검색에 실패했습니다. (${response.status})`);
  }

  return response.json();
}

// 장바구니 상품 일괄 구매
export async function purchaseProducts(purchaseItems) {
  const response = await fetch("/products/purchase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchaseItems),
  });

  if (!response.ok) {
    throw new Error(`구매에 실패했습니다. (${response.status})`);
  }

  return response.json();
}