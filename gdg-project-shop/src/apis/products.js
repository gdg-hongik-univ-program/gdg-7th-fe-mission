//아직 미정
const BASE_URL = "http://서버주소";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`요청 실패: ${response.status}`);
  }

  return response.json();
}

export function getProducts() {
  return request("/products");
}

export function searchProduct(itemName) {
  return request(`/products?itemName=${encodeURIComponent(itemName)}`);
}

export function purchaseProducts(cart) {
  return request("/products/purchase", {
    method: "POST",
    body: JSON.stringify(cart),
  });
}

export function createProduct(newItem) {
  return request("/admin/products", {
    method: "POST",
    body: JSON.stringify(newItem),
  });
}

export function addStock(stock) {
  return request("/admin/products/stock", {
    method: "PATCH",
    body: JSON.stringify(stock),
  });
}

export function deleteProduct(target) {
  return request("/admin/products", {
    method: "DELETE",
    body: JSON.stringify(target),
  });
}