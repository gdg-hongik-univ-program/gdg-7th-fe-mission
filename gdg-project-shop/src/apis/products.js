const BASE_URL = "http://192.168.237.95:8080";

export const getProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);

  if (!res.ok) {
    throw new Error("상품 데이터를 불러오지 못했습니다.");
  }

  return res.json();
};

export const createProduct = async (product) => {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  if (!res.ok) {
    throw new Error("상품 등록에 실패했습니다.");
  }

  return res.json();
};

export const addStock = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/products/stock`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("재고 추가에 실패했습니다.");
  }

  return res.json();
};

export const deleteProduct = async (data) => {
  const res = await fetch(`${BASE_URL}/admin/products`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("상품 삭제에 실패했습니다.");
  }

  return res.json();
};

export const purchaseProducts = async (cart) => {
  const res = await fetch(`${BASE_URL}/products/purchase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cart),
  });

  if (!res.ok) {
    throw new Error("구매에 실패했습니다.");
  }

  return res.json();
};

export const searchProduct = async (itemName) => {
  const res = await fetch(
    `${BASE_URL}/products?itemName=${encodeURIComponent(itemName)}`,
  );

  if (!res.ok) {
    throw new Error("상품을 찾지 못했습니다.");
  }

  return res.json();
};
