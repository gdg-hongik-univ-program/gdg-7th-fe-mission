// 상품 등록
export async function registerProduct(product) {
  const response = await fetch('/data/products.json', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`상품 등록 실패 (${response.status})`);
  }

  return response.json();
}

// 재고 추가
export async function addProductStock(stock) {
  const response = await fetch('/data/products.json', {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stock),
  });

  if (!response.ok) {
    throw new Error(`재고 추가 실패 (${response.status})`);
  }

  return response.json();
}

// 상품 삭제
export async function deleteProduct(itemName) {
  const response = await fetch('/data/products.json', {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ itemName }),
  });

  if (!response.ok) {
    throw new Error(`상품 삭제 실패 (${response.status})`);
  }

  return response.json();
}