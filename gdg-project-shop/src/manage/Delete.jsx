// import { deleteProducts } from '../apis/products.js';
import { useState } from "react";


function Delete() {
    const [itemName, setItemname] = useState("");
    const consoleClick = () =>{
        console.log("상품이 삭제되었습니다.");
        console.log(
            { itemName: itemName.trim() }
        )
    }

    return(
        <>
        <p className="pt-3 font-bold text-lg">상품 삭제</p>
        <div className="flex flex-col gap-4 border rounded-md p-5 w-150">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    <div className="flex items-center gap-4">
                        <label className="w-16 shrink-0">상품명</label>
                        <input value={itemName} onChange={(e)=>setItemname(e.target.value)} placeholder="상품명 입력..." className="flex-1 min-w-0 border rounded-md px-2 h-8 placeholder:text-xs" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button onClick={consoleClick} className="w-32 h-8 rounded-md bg-red-500 text-white text-sm cursor-pointer">삭제</button>
                </div>
        </div>
        </>
    )
}

export default Delete;