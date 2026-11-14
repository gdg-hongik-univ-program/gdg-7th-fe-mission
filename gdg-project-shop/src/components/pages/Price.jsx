import Item from "../Item";
import { useState } from "react";

function Price({item, addToCart, cart}) {
    const [lower,setLower] = useState("");
    const [upper,setUpper] = useState("");
    const [range,setRange] = useState(null);

    const handleSearch = () => {
        if (isInvalid) return;
        const min = lower === "" ? 0 : Number(lower);
        const max = upper === "" ? Infinity : Number(upper);
        setRange({min, max})
    }

    const isInvalid =
    (lower !== "" && Number(lower) < 0) ||
    (upper !== "" && Number(upper) < 0) ||
    (lower !== "" && upper !== "" && Number(lower) > Number(upper));

    const filterItem_P = range ? item.filter((item) => {
        return item.price >= range.min && item.price <= range.max;
    }) : [];

    return (
        <>
        <div className="flex justify-center items-center gap-3 pt-3">
            <input value={lower} onChange={(e) => setLower(e.target.value)} placeholder="0" className="border w-40 h-6 rounded-sm"></input>
            <input value={upper} onChange={(e) => setUpper(e.target.value)} placeholder="0" className="border w-40 h-6 rounded-sm"></input>
            <button onClick={handleSearch} className="bg-blue-500 w-15 h-6 rounded-sm text-white text-sm cursor-pointer">검색</button>
        </div>
        
        <div className="flex flex-col items-center gap-3 pt-3">
            {filterItem_P.map((item) => <Item key={item.id} item={item} addToCart={addToCart} cart={cart}/>)}
        </div>
        </>
    )
}

export default Price;