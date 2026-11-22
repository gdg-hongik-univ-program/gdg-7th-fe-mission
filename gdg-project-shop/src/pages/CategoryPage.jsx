import { useState } from 'react';
import Item from '../components/Item';
 
function CategoryPage({ items }) {
  const [category, setCategory] = useState('');

  const filteredItems =
    category === ''
      ? items
      : items.filter((item) => item.category === category);
 
  return (
    <main className="max-w-3xl mx-auto mt-6">
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 mb-6"
      >
        <option value="">카테고리 선택</option>
        <option value="의류">의류</option>
        <option value="전자기기">전자기기</option>
        <option value="화장품">화장품</option>
        <option value="식품">식품</option>
      </select>

      {filteredItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </main>
  );
}
 
export default CategoryPage;