import Item from "./Item";
import itemData from "../data/itemData";

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