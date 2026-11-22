import { useState } from 'react';
import { createProduct, addStock, deleteProduct } from '../apis/products.js';
import {
  validateProductRegister,
  validateStockAdd,
  validateProductDelete,
} from '../utils/validation.js';

function Admin({ onRefresh }) {
  // 1. 상품 등록 상태
  const [regName, setRegName] = useState('');
  const [regPrice, setRegPrice] = useState('0');
  const [regQuantity, setRegQuantity] = useState('0');
  const [regCategory, setRegCategory] = useState('');

  // 2. 재고 추가 상태
  const [addName, setAddName] = useState('');
  const [addQuantity, setAddQuantity] = useState('0');

  // 3. 상품 삭제 상태
  const [delName, setDelName] = useState('');

  // 1. 상품 등록 핸들러
  const handleRegister = async (e) => {
    e.preventDefault();

    const data = {
      itemName: regName.trim(),
      price: Number(regPrice),
      quantity: Number(regQuantity),
      category: regCategory,
    };

    const errorMessage = validateProductRegister(data);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const result = await createProduct(data);
      console.log('상품이 등록되었습니다.', result);
      await onRefresh();
      alert('상품이 등록되었습니다.');

      setRegName('');
      setRegPrice('0');
      setRegQuantity('0');
      setRegCategory('');
    } catch (error) {
      console.error(error);
      alert(error.message || '상품 등록 중 오류가 발생했습니다.');
    }
  };

  // 2. 재고 추가 핸들러
  const handleAddStock = async (e) => {
    e.preventDefault();

    const stockData = {
      itemName: addName.trim(),
      quantity: Number(addQuantity),
    };

    const errorMessage = validateStockAdd(stockData);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const result = await addStock(stockData);
      console.log('재고가 추가되었습니다.', result);
      await onRefresh();
      alert('재고가 추가되었습니다.');

      setAddName('');
      setAddQuantity('0');
    } catch (error) {
      console.error(error);
      alert(error.message || '재고 추가 중 오류가 발생했습니다.');
    }
  };

  // 3. 상품 삭제 핸들러
  const handleDelete = async (e) => {
    e.preventDefault();

    const trimmedName = delName.trim();
    const errorMessage = validateProductDelete(trimmedName);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    try {
      const result = await deleteProduct({ itemName: trimmedName });
      console.log('상품이 삭제되었습니다.', result);
      await onRefresh();
      alert('상품이 삭제되었습니다.');

      setDelName('');
    } catch (error) {
      console.error(error);
      alert(error.message || '상품 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <main className="admin-page">
      {/* 기존 JSX UI 그대로 유지 */}
      <section className="admin-section">
        <h2>상품 등록</h2>
        <form className="admin-card" onSubmit={handleRegister}>
          <div className="admin-grid">
            <div className="admin-field">
              <label>상품명</label>
              <input
                type="text"
                placeholder="상품명 입력..."
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>수량</label>
              <input
                type="number"
                min="0"
                value={regQuantity}
                onChange={(e) => setRegQuantity(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>가격</label>
              <input
                type="number"
                min="0"
                value={regPrice}
                onChange={(e) => setRegPrice(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>카테고리</label>
              <select
                value={regCategory}
                onChange={(e) => setRegCategory(e.target.value)}
              >
                <option value="">카테고리 선택</option>
                <option value="의류">의류</option>
                <option value="전자기기">전자기기</option>
                <option value="화장품">화장품</option>
                <option value="식품">식품</option>
              </select>
            </div>
          </div>

          <div className="admin-card-footer">
            <span className="admin-guide">
              * 추가 기능을 카테고리로 설정한 경우에만 카테고리를 이용해주세요.
            </span>
            <button type="submit" className="admin-btn primary">
              등록
            </button>
          </div>
        </form>
      </section>

      <section className="admin-section">
        <h2>재고 추가</h2>
        <form className="admin-card" onSubmit={handleAddStock}>
          <div className="admin-grid">
            <div className="admin-field">
              <label>상품명</label>
              <input
                type="text"
                placeholder="상품명 입력..."
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
              />
            </div>

            <div className="admin-field">
              <label>수량</label>
              <input
                type="number"
                min="0"
                value={addQuantity}
                onChange={(e) => setAddQuantity(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-card-footer right-only">
            <button type="submit" className="admin-btn primary">
              추가
            </button>
          </div>
        </form>
      </section>

      <section className="admin-section">
        <h2>상품 삭제</h2>
        <form className="admin-card" onSubmit={handleDelete}>
          <div className="admin-grid">
            <div className="admin-field">
              <label>상품명</label>
              <input
                type="text"
                placeholder="상품명 입력..."
                value={delName}
                onChange={(e) => setDelName(e.target.value)}
              />
            </div>
          </div>

          <div className="admin-card-footer right-only">
            <button type="submit" className="admin-btn danger">
              삭제
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Admin;
