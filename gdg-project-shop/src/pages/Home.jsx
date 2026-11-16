import { useState } from 'react';
import { search } from '../apis/products';

function Home() {
    const [text, setText] = useState("");
    const handleClick = () => {
        (async () => {
        try {
            await search(text);
        } catch (error) {
          console.error("상품 데이터를 불러오는 데 실패했습니다:", error);
        }
      })();
    };

    return (
        <div className="content">
            <div className="form">
                <input type="search" value={text} onChange={e => setText(e.target.value)} id="search" placeholder="상품 검색..."></input>
                <button onClick={handleClick}>검색</button>
            </div>
            <img src='/gdg-logo.svg' />
            <p className="result">검색 결과가 없습니다. </p>
        </div>
    );
}

export default Home;