import { useState } from "react";
import { createProduct, addStock, deleteProduct } from "../apis/products";

function AdminPage({ setProducts }) {
    const [itemName, setItemName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [stockName, setStockName] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");

    const [deleteName, setDeleteName] = useState("");

    const isPositiveNumber = (value) => Number.isInteger(Number(value)) && Number(value) > 0;

    const handleRegister = async () => {
        if (!itemName || !price || !quantity || !category) {
            alert("모든 항목을 입력해주세요.");
            return;
        }
        if (!isPositiveNumber(price) || !isPositiveNumber(quantity)) {
            alert("가격과 수량은 1 이상의 숫자로 입력해주세요.");
            return;
        }
        const data = { itemName, price: Number(price), quantity: Number(quantity), category };

        try {
            const result = await createProduct(data);
            console.log("상품 등록 완료", result);
            alert("상품이 등록되었습니다.");
        } catch (err) {
            alert(err.message);
        }
    };

    const handleAddStock = async () => {
        if (!stockName || !stockQuantity) {
            alert("상품명과 수량을 입력해주세요.");
            return;
        }
        if (!isPositiveNumber(stockQuantity)) {
            alert("수량은 1 이상의 숫자로 입력해주세요.");
            return;
        }
        const data = { itemName: stockName, quantity: Number(stockQuantity) };

        try {
            const result = await addStock(data);
            console.log("재고 추가 완료", result);
            alert(`${result.itemName}의 재고가 ${result.quantity}개가 되었습니다.`);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async () => {
        if (!deleteName) {
            alert("삭제할 상품명을 입력해주세요.");
            return;
        }
        const data = { itemName: deleteName };

        try {
            const result = await deleteProduct(data);
            console.log("상품 삭제 완료", result);
            setProducts(result);
            alert("상품이 삭제되었습니다.");
        } catch (err) {
            alert(err.message);
        }
    };

    const inputClass = "border border-gray-300 rounded-md px-3 py-2 text-sm";
    const buttonClass = "bg-blue-500 text-white rounded-md py-2 text-sm";

    return (
        <main className="content">
            <div className="w-[480px] max-w-[90%] flex flex-col gap-10">
                <section className="flex flex-col gap-3">
                    <h2 className="font-bold">상품 등록</h2>
                    <input className={inputClass} placeholder="상품명" value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    <input className={inputClass} placeholder="가격" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input className={inputClass} placeholder="수량" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    <select className={inputClass} value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">카테고리 선택</option>
                        <option value="의류">의류</option>
                        <option value="전자기기">전자기기</option>
                        <option value="화장품">화장품</option>
                        <option value="식품">식품</option>
                    </select>
                    <button className={buttonClass} onClick={handleRegister}>등록</button>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-bold">재고 추가</h2>
                    <input className={inputClass} placeholder="상품명" value={stockName} onChange={(e) => setStockName(e.target.value)} />
                    <input className={inputClass} placeholder="추가할 수량" value={stockQuantity} onChange={(e) => setStockQuantity(e.target.value)} />
                    <button className={buttonClass} onClick={handleAddStock}>재고 추가</button>
                </section>

                <section className="flex flex-col gap-3">
                    <h2 className="font-bold">상품 삭제</h2>
                    <input className={inputClass} placeholder="상품명" value={deleteName} onChange={(e) => setDeleteName(e.target.value)} />
                    <button className={buttonClass} onClick={handleDelete}>삭제</button>
                </section>
            </div>
        </main>
    );
}

export default AdminPage;