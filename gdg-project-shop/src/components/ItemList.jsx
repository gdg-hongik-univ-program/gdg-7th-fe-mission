import Item from "./Item";

function ItemList({ items = itemData }) {
  return (
    <div className="item-list">
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}

export default ItemList;