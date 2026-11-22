// src/utils/validation.js

// 상품 등록 입력값 검증
export function validateProductRegister({
  itemName,
  price,
  quantity,
  category,
}) {
  if (!itemName || !category) {
    return '상품명과 카테고리를 모두 입력해 주세요.';
  }
  if (price === '' || Number.isNaN(price) || price <= 0) {
    return '가격은 1원 이상의 올바른 숫자로 입력해 주세요.';
  }
  if (
    quantity === '' ||
    Number.isNaN(quantity) ||
    quantity < 1 ||
    !Number.isInteger(quantity)
  ) {
    return '수량은 1개 이상의 정수로 입력해 주세요.';
  }
  return null; // 에러 없음
}

// 재고 추가 입력값 검증
export function validateStockAdd({ itemName, quantity }) {
  if (!itemName) {
    return '상품명을 입력해 주세요.';
  }
  if (
    quantity === '' ||
    Number.isNaN(quantity) ||
    quantity < 1 ||
    !Number.isInteger(quantity)
  ) {
    return '추가할 수량은 1개 이상의 정수로 입력해 주세요.';
  }
  return null;
}

// 상품 삭제 입력값 검증
export function validateProductDelete(itemName) {
  if (!itemName) {
    return '삭제할 상품명을 입력해 주세요.';
  }
  return null;
}
