import { useState } from 'react';
import { search } from '../apis/products';
import Card from '../components/Card';

function Home({ cart, addCart, itemData }) {
    const [text, setText] = useState("");
    const [item, setItem] = useState(itemData);
    const handleClick = () => {
        (async () => {
        try {
            const response = await search(text);
            console.log(response);
            response && setItem(text ? [response] : response);
        } catch (error) {
            setItem(null);
            console.error("상품 데이터를 불러오는 데 실패했습니다:", error);
        }
      })();
    };

    return (
        <div className="content">
            <div className="form">
                <input className="w-80" type="search" value={text} onChange={e => setText(e.target.value)} id="search" placeholder="상품 검색..."></input>
                <button onClick={handleClick}>검색</button>
            </div>
            <img src='/gdg-logo.svg' />
            <div className="flex flex-col gap-8 items-center w-full">
                {item ? item.map(item =>
                    <Card addCart={addCart} cart={cart} key={item.id} id={item.id} name={item.itemName} price={item.price} quant={item.quantity} />
                ) : (
                    <p className="result">검색 결과가 없습니다. </p>
                )}
            </div>
        </div>
    );
}

export default Home;