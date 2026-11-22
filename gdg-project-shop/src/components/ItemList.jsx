import Item from "./Item";

// 상품 목록 그리기 (어떤 상품을 보여 줄지는 페이지가 정함)
export default function ItemList({ items, emptyMessage = "상품이 없어요." }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-end">
        <button className="border-b border-black text-sm text-black">
          내 구매 내역
        </button>
      </div>

      {items.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          {emptyMessage}
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <Item key={item.id} {...item} />
          ))}
        </div>
      )}
    </div>
  );
}