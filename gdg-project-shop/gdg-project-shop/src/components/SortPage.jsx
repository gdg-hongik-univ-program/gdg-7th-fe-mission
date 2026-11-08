import { useState } from 'react';
import { itemData } from '../data/mockData';
import Item from './Item';
 
function SortPage({ cart, setCart }) {
  const [sortType, setSortType] = useState('');
  const sortedItems = [...itemData];
 
  if (sortType === 'name') {
    sortedItems.sort((a, b) => a.itemName.localeCompare(b.itemName));
  } else if (sortType === 'price') {
    sortedItems.sort((a, b) => a.price - b.price);
  }
 
  return (
    <main className="max-w-3xl mx-auto mt-6">
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 mb-6"
      >
        <option value="">정렬 기준 선택</option>
        <option value="name">이름순 (가나다)</option>
        <option value="price">가격순</option>
      </select>
 
      {sortedItems.map((item) => (
        <Item key={item.id} item={item} cart={cart} setCart={setCart} />
      ))}
    </main>
  );
}
 
export default SortPage;