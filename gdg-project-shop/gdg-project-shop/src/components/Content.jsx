import { itemData } from '../data/mockData';
import Item from './Item';
 

function Content({ cart, setCart }) {
  return (
    <main className="content">
      <div className="search-box">
        <input type="text" placeholder="상품 검색" className="search-input" />
        <button className="search-button">검색</button>
      </div>
 
      <div className="max-w-3xl mx-auto mt-6">
        {itemData.map((item) => (
          <Item key={item.id} item={item} cart={cart} setCart={setCart} />
        ))}
      </div>
    </main>
  );
}
 
export default Content;
 