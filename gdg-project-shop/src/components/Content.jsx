import {useState} from "react";

export default function Content(){
    const [inputText, setInputText] = useState("");     //현재 작성중인 내용
    const [searchText, setSearchText] = useState("");   // 검색할 내용

    function handleSearch(e){
        e.preventDefault();
        setSearchText(inputText)
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
                    {searchText || "검색 결과가 없습니다."}
                </p>
            </section>
        </main>
    )
}