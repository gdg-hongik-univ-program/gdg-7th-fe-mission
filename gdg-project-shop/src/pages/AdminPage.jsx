import { useState } from 'react';
import { createProduct, addStock, deleteProduct } from '../apis/products';

// 카테고리
const categories = ["의류", "전자기기", "화장품", "식품"];

export default function AdminPage({ onRefresh }){
    // 상품 등록
    const [newName, setNewName] = useState("");
    const [newQuantity, setNewQuantity] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newCategory, setNewCategory] = useState("");

    // 재고 추가
    const [stockName, setStockName] = useState("");
    const [stockQuantity, setStockQuantity] = useState("");

    // 상품 삭제
    const [deleteName, setDeleteName] = useState("");

    // 숫자만 입력되게
    function onlyNumber(value, setValue) {
    if (/^\d*$/.test(value)) setValue(value);
    }

    // 상품 등록
    async function handleRegister() {
        if (newName === "" || newCategory === "") {
            alert("상품명과 카테고리를 입력해 주세요.");
            return;
        }
        const product = {
            itemName: newName,
            price: Number(newPrice),
            quantity: Number(newQuantity),
            category: newCategory,
        };
        try {
            const result = await createProduct(product);
            console.log(result);
            alert("상품이 등록되었습니다.");
            await onRefresh();
        } catch (error) {
            console.error(error);
            alert("상품 등록에 실패했어요.");
        }
    }

    // 재고 추가
    async function handleAddStock() {
        const stock = {
            itemName: stockName,
            quantity: Number(stockQuantity),
        };
        try {
            const result = await addStock(stock);
            console.log(result);
            alert("재고가 추가되었습니다.");
            await onRefresh();
        } catch (error) {
            console.error(error);
            alert("재고 추가에 실패했어요.");
        }
    }

    // 상품 삭제
    async function handleDelete() {
        try {
            const result = await deleteProduct(deleteName);
            console.log(result);
            alert("상품이 삭제되었습니다.");
            await onRefresh();
        } catch (error) {
            console.error(error);
            alert("상품 삭제에 실패했어요.");
        }
    }

    // 반복되는 Tailwind 클래스를 한 번만 적어 두고 재사용
    const inputClass = "h-10 w-full rounded-md border border-gray-400 px-3 text-sm text-black";
    const labelClass = "text-sm text-black";

    return(
        <main className="mx-auto flex max-w-2xl flex-col gap-14 px-6 py-8">
            {/*상품 등록*/}
            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-black">상품 등록</h2>
                <div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-6">
                    <div className="grid grid-cols-[64px_1fr_64px_1fr] items-center gap-x-4 gap-y-3">
                        <label className={labelClass}>상품명</label>
                        <input  
                        className={inputClass}
                        placeholder="상품명 입력..."
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        />
                        <label className={labelClass}>수량</label>
                        <input  
                        className={inputClass}
                        inputMode="numeric"
                        placeholder="0"
                        value={newQuantity}
                        onChange={(e) => onlyNumber(e.target.value, setNewQuantity)}
                        />
                        <label className={labelClass}>가격</label>
                        <input
                        className={inputClass}
                        inputMode="numeric"
                        placeholder="0"
                        value={newPrice}
                        onChange={(e) => onlyNumber(e.target.value, setNewPrice)}
                        />
                        <label className={labelClass}>카테고리</label>
                        <select
                        className={inputClass}
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        >
                            <option value="">카테고리 선택</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                                ))}
                        </select>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                        <p className="text-xs text-gray-500">* 추가 기능을 카테고리로 설정한 경우에만 카테고리를 이용해주세요.</p>
                        <button
                        onClick={handleRegister}
                        className="h-9 w-36 shrink-0 rounded-md bg-blue-500 text-sm text-white"
                        >
                            등록
                        </button>
                    </div>
                </div>
            </section>

            {/*재고 추가*/}
            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-black">재고 추가</h2>
                <div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-6">
                    <div className="grid grid-cols-[64px_1fr_64px_1fr] items-center gap-x-4 gap-y-3">
                        <label className={labelClass}>상품명</label>
                        <input
                        className={inputClass}
                        placeholder="상품명 입력..."
                        value={stockName}
                        onChange={(e) => setStockName(e.target.value)}
                        />
                        <label className={labelClass}>수량</label>
                        <input
                        className={inputClass}
                        inputMode="numeric"
                        placeholder="0"
                        value={stockQuantity}
                        onChange={(e) => onlyNumber(e.target.value, setStockQuantity)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                        onClick={handleAddStock}
                        className="h-9 w-36 rounded-md bg-blue-500 text-sm text-white"
                        >
                            추가
                        </button>
                    </div>
                </div>
            </section>

            {/*상품 삭제*/}
            <section className="flex flex-col gap-4">
                <h2 className="text-lg font-bold text-black">상품 삭제</h2>
                <div className="flex flex-col gap-4 rounded-lg border border-gray-400 p-6">
                    <div className="grid grid-cols-[64px_1fr_64px_1fr] items-center gap-x-4 gap-y-3">
                        <label className={labelClass}>상품명</label>
                        <input
                        className={inputClass}
                        placeholder="상품명 입력..."
                        value={deleteName}
                        onChange={(e) => setDeleteName(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                        onClick={handleDelete}
                        className="h-9 w-36 rounded-md bg-red-500 text-sm text-white"
                        >
                            삭제
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
}