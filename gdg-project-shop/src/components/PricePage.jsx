import { useState } from 'react';
import { itemData } from '../data/mockData';
import Item from './Item';
 
function PricePage({ cart, setCart }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [filteredItems, setFilteredItems] = useState(itemData);
  const handleSearch = () => {
    if (minPrice === '' || maxPrice === '') {
      alert('최소 가격과 최대 가격을 모두 입력해주세요');
      return;
    }
 
    const min = Number(minPrice);
    const max = Number(maxPrice);
 
    if (min > max) {
      alert('최소 가격이 최대 가격보다 클 수 없어요');
      return;
    }
    setFilteredItems(itemData.filter((item) => item.price >= min && item.price <= max));
  };
 
  return (
    <main className="max-w-3xl mx-auto mt-6">
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value.replace(/[^0-9]/g, ''))}
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="0"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value.replace(/[^0-9]/g, ''))}
          className="border border-gray-300 rounded-lg px-3 py-2 flex-1"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white rounded-lg px-6 py-2">
          검색
        </button>
      </div>
      {filteredItems.map((item) => (
        <Item key={item.id} item={item} cart={cart} setCart={setCart} />
      ))}
    </main>
  );
}
 
export default PricePage;