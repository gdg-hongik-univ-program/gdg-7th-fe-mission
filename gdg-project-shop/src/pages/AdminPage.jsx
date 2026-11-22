import { useState } from 'react';
import { createProduct, addStock, deleteProduct } from '../apis/products';

function AdminPage() {
    const [itemName, setItemName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [category, setCategory] = useState('');
    const [stockName, setStockName] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [deleteName, setDeleteName] = useState('');
    const handleRegister = async () => {
        if (itemName === '' || price === '' || quantity === '' || category === '') {
        alert('상품명, 가격, 수량, 카테고리를 모두 입력해주세요');
        return;
        }
        if (Number(price) < 1 || Number(quantity) < 1) {
        alert('가격과 수량은 1 이상이어야 해요');
        return;
        }
        const newProduct = {
            itemName: itemName,
            price: Number(price),
            quantity: Number(quantity),
            category: category,
        };
        try {
            const result = await createProduct(newProduct);
            console.log('상품이 등록되었어요', result);
            alert(`'${result.itemName}' 상품이 등록되었어요`);
            setItemName('');
            setPrice('');
            setQuantity('');
            setCategory('');
        } catch (error) {
            console.error('상품 등록에 실패했어요', error);
            alert('상품 등록에 실패했어요');
        }
    };

    const handleAddStock = async () => {
        if (stockName === '' || stockQuantity === '') {
            alert('상품명과 추가할 수량을 모두 입력해주세요');
            return;
        }
        if (Number(stockQuantity) < 1) {
            alert('추가할 수량은 1 이상이어야 해요');
            return;
        }

        const stockData = {
            itemName: stockName,
            quantity: Number(stockQuantity),
        };
        try {
            const result = await addStock(stockData);
            console.log('재고가 추가되었어요', result);
            alert(`'${result.itemName}' 재고가 추가되었어요. 지금 수량: ${result.quantity}개`);
            setStockName('');
            setStockQuantity('');
        } catch (error) {
            console.error('재고 추가에 실패했어요', error);
            alert('재고 추가에 실패했어요');
        }
    };

    const handleDelete = async () => {
        if (deleteName === '') {
            alert('삭제할 상품명을 입력해주세요');
            return;
        }

        const deleteData = {
            itemName: deleteName,
        };
        try {
            const result = await deleteProduct(deleteData);
            console.log('상품이 삭제되었어요. 남은 상품: ', result);
            alert(`'${deleteName}' 상품이 삭제되었어요`);
            setDeleteName('');
        } catch (error) {
            console.error('상품 삭제에 실패했어요', error);
            alert('상품 삭제에 실패했어요');
        }
    };

    return (
        <main className="max-w-3xl mx-auto mt-6">
            <h2 className="text-xl font-bold mb-6">상품 등록</h2>
            <div className="border border-gray-400 rounded-xl p-6 mb-16">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center">
                    <label className="w-20 font-bold">상품명</label>
                    <input
                        type="text"
                        placeholder="상품명 입력..."
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="border border-gray-400 rounded-lg px-3 py-2 flex-1 min-w-0"
                />
                </div>
                <div className="flex items-center">
                    <label className="w-20 font-bold">수량</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value.replace(/[^0-9]/g, ''))}
                        className="border border-gray-400 rounded-lg px-3 py-2 flex-1 min-w-0"
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-20 font-bold">가격</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        value={price}
                        onChange={(e) => setPrice(e.target.value.replace(/[^0-9]/g, ''))}
                        className="border border-gray-400 rounded-lg px-3 py-2 flex-1 min-w-0"
                    />
                </div>
                <div className="flex items-center">
                    <label className="w-20 font-bold">카테고리</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-gray-400 rounded-lg px-3 py-2 flex-1 min-w-0"
                    >
                        <option value="">카테고리 선택</option>
                        <option value="의류">의류</option>
                        <option value="전자기기">전자기기</option>
                        <option value="화장품">화장품</option>
                        <option value="식품">식품</option>
                    </select>
                </div>
            </div>
            <div className="flex items-center justify-between mt-5">
                <p className="text-sm text-gray-400">* 추가 기능을 카테고리로 설정한 경우에만 카테고리를 이용해주세요.</p>
                <button onClick={handleRegister} className="bg-blue-500 text-white font-bold rounded-lg w-44 py-1.5">
                    등록
                </button>
            </div>
        </div>
        <h2 className="text-xl font-bold mb-6">재고 추가</h2>
        <div className="border border-gray-400 rounded-xl p-6 mb-16">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center">
                    <label className="w-20 font-bold">상품명</label>
                    <input
                        type="text"
                        placeholder="상품명 입력..."
                        value={stockName}
                        onChange={(e) => setStockName(e.target.value)}
                        className="border border-gray-400 rounded-lg px-3 py-2 flex-1 min-w-0"
                />
                </div>
                <div className="flex items-center">
                    <label className="w-20 font-bold">수량</label>
                    <input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        value={stockQuantity}
                        onChange={(e) => setStockQuantity(e.target.value.replace(/[^0-9]/g, ''))}
                        className="border border-gray-400 rounded-lg px-3 py-2 flex-1 min-w-0"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleAddStock} className="bg-blue-500 text-white font-bold rounded-lg w-44 py-1.5">
                    추가
                </button>
            </div>
        </div>

        <h2 className="text-xl font-bold mb-6">상품 삭제</h2>
        <div className="border border-gray-400 rounded-xl p-6 mb-16">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                <div className="flex items-center">
                    <label className="w-20 font-bold">상품명</label>
                    <input
                        type="text"
                        placeholder="상품명 입력..."
                        value={deleteName}
                        onChange={(e) => setDeleteName(e.target.value)}
                        className="border border-gray-400 rounded-lg px-3 py-2 flex-1 min-w-0"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-4">
                <button onClick={handleDelete} className="bg-red-600 text-white font-bold rounded-lg w-44 py-1.5">
                    삭제
                </button>
            </div>
        </div>
        </main>
    );
}

export default AdminPage;