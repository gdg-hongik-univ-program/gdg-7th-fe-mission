import { use, useState } from "react";
import Item from './Item.jsx'

function Home({item, addToCart, cart}) {
  const [keyWord, setKeyWord] = useState("");
  const [search, setSearch] = useState("");

  const filterItem = search.trim() ? item.filter((item) => item.itemName === search.trim()) : [];
  
  return (
    <div className="flex flex-col items-center gap-3 p-3">
      <div className="flex items-center gap-3">
         <input value={keyWord} onChange={(e) => setKeyWord(e.target.value)} placeholder="상품 검색..." className="bg-white border placeholder:text-sm rounded-2xl w-[450px] h-[30px]"/>
         <button onClick={() => setSearch(keyWord)} className="bg-blue-500 w-10 h-[30px] rounded-2xl text-white text-sm">검색</button>
      </div>

      <div className="flex flex-col items-center rounded-2xl gap-4 p-2">
          {filterItem.length === 0 ? (<><img src="/gdg-favicon.svg" className="w-[400px] h-auto opacity-15"></img><p>검색 결과가 없습니다</p></>) : (
            filterItem.map((item) => (
              <Item key={item.id} item={item} addToCart={addToCart} cart={cart}/>
            ))
          ) }
      </div>
    </div>
  );  
}

export default Home;