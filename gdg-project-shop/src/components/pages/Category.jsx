import Item from "../Item";
import { useState } from "react";

function Category({item, addToCart, cart}) {
    const [isOpen,setOpen] =  useState(false);
    const [category,setCatagory] = useState("카테고리 선택");

    const handleClick = (e) => {
        setCatagory(e.currentTarget.textContent);
        setOpen(false);
    }

    const filterItem_C = category ? item.filter((item) => item.category === category) : [];

    return (
        <div className="flex flex-col items-center p-3">
        <button onClick={() => setOpen(!isOpen)} className="border bg-white rounded-md cursor-pointer w-[150px] text-sm">{category}</button>
        {isOpen ? (<>
        <button onClick={handleClick} className="border bg-gray-200 rounded-md cursor-pointer w-[150px] text-sm">의류</button>
        <button onClick={handleClick} className="border bg-gray-200 rounded-md cursor-pointer w-[150px] text-sm">전자기기</button>
        <button onClick={handleClick} className="border bg-gray-200 rounded-md cursor-pointer w-[150px] text-sm">화장품</button>
        <button onClick={handleClick} className="border bg-gray-200 rounded-md cursor-pointer w-[150px] text-sm">식품</button></>) : (<></>)}
        
        <div className="flex flex-col items-center gap-3 pt-3">
            {filterItem_C.map((item) => (<Item key={item.id} item={item} addToCart={addToCart} cart={cart}/>))}
        </div>
        </div>
    )
}

export default Category;
//전체면 전부 렌더링