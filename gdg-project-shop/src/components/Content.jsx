import {useState} from "react";
import { searchProduct } from "../apis/products";

export default function Content(){
    const [inputText, setInputText] = useState("");     //현재 작성중인 내용
    const [result, setResult] = useState(null);         // 검색 결과 (상품 하나)
    const [message, setMessage] = useState("");         // 안내 문구

    async function handleSearch(e){
        e.preventDefault();
        if (inputText.trim() === "") return;
        try {
            const product = await searchProduct(inputText.trim());
            setResult(product);
            setMessage("");
        } catch (error) {
            console.error(error);
            setResult(null);
            setMessage("검색 결과가 없습니다.");
        }
    }

    return(
        <main className="content">
            <form onSubmit={handleSearch}>
                <input 
                className="inputBox" 
                type="text" 
                placeholder="상품 검색..." 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                />
                <button
                type="submit" 
                className="searchButton">검색
                </button>
            </form>
            <section className="mainSection">
                <img className="mainLogo" 
                src="/gdg-logo.svg" 
                alt="gdg 로고"/>
                <p className="searchResult">
                    {result
                        ? `${result.itemName} · ${result.price.toLocaleString()}원 · 재고 ${result.quantity}개`
                        : message || "검색 결과가 없습니다."}
                </p>
            </section>
        </main>
    )
}