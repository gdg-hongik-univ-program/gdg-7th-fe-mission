// 장바구니 state 갱신 로직을 한 곳에 모음
// cart: [{ id: 1, count: "2" }, ...]
export function cartReducer(cart, action) {
  switch (action.type) {
    case "ADD":
      return [...cart, { id: action.id, count: action.count }];
    case "CLEAR":
      return [];
    default:
      throw new Error(`알 수 없는 action: ${action.type}`);
  }
}
