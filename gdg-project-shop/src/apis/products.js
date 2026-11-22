const STORAGE_KEY = 'gdg_shop_products';

// 내부 헬퍼: localStorage에 데이터가 없으면 products.json에서 초기 데이터 로드
async function loadInitialProducts() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    return JSON.parse(saved);
  }

  const url = new URL('../data/products.json', import.meta.url);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('상품 조회 실패');
  }

  const data = await response.json();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}

// 내부 헬퍼: 변경된 상품 목록 저장
function saveProducts(products) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// GET: 전체 상품조회
export async function getProducts() {
  return await loadInitialProducts();
}

// GET: 상품명 검색
export async function searchProduct(itemName) {
  const products = await loadInitialProducts();
  const keyword = itemName.trim().toLowerCase();

  return products.filter((item) =>
    item.itemName.toLowerCase().includes(keyword)
  );
}

// POST: 장바구니 상품 일괄구매 (재고 차감)
// cart: [{ id: 1, count: 2 }, { id: 2, count: 1 }]
export async function purchaseProducts(cart) {
  const products = await loadInitialProducts();

  const updated = products.map((item) => {
    const cartItem = cart.find((c) => c.id === item.id);
    if (!cartItem) return item;

    if (item.quantity < cartItem.count) {
      throw new Error(`${item.itemName}의 재고가 부족합니다.`);
    }

    return {
      ...item,
      quantity: item.quantity - cartItem.count,
    };
  });

  saveProducts(updated);
  return { message: '상품 구매 완료', products: updated };
}

// POST: 상품등록
// productData: { itemName, price, quantity, category }
export async function createProduct(productData) {
  const products = await loadInitialProducts();

  const isDuplicate = products.some(
    (item) => item.itemName === productData.itemName
  );
  if (isDuplicate) {
    throw new Error('이미 등록된 상품명입니다.');
  }

  const nextId =
    products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;

  const newProduct = {
    id: nextId,
    ...productData,
  };

  const updated = [...products, newProduct];
  saveProducts(updated);
  return newProduct;
}

// PATCH: 재고 추가
// stock: { itemName, quantity }
export async function addStock(stock) {
  const products = await loadInitialProducts();
  const targetIndex = products.findIndex(
    (item) => item.itemName === stock.itemName
  );

  if (targetIndex === -1) {
    throw new Error('해당 상품을 찾을 수 없습니다.');
  }

  const updated = products.map((item, idx) =>
    idx === targetIndex
      ? { ...item, quantity: item.quantity + Number(stock.quantity) }
      : item
  );

  saveProducts(updated);
  return updated[targetIndex];
}

// DELETE: 상품 삭제
// productData: { itemName }
export async function deleteProduct(productData) {
  const products = await loadInitialProducts();
  const exists = products.some(
    (item) => item.itemName === productData.itemName
  );

  if (!exists) {
    throw new Error('삭제할 상품을 찾을 수 없습니다.');
  }

  const updated = products.filter(
    (item) => item.itemName !== productData.itemName
  );

  saveProducts(updated);
  return { message: '상품 삭제 완료', itemName: productData.itemName };
}
