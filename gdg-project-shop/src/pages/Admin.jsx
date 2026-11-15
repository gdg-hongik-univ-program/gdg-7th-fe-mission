import { useState } from 'react';

function Admin() {
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

  // 상품 등록 핸들러
  const handleRegister = (e) => {
    e.preventDefault();

    const trimmedName = regName.trim();
    const priceNum = Number(regPrice);
    const quantityNum = Number(regQuantity);

    // 필수 입력값 및 가격/수량 검증
    if (!trimmedName || !regCategory) {
      alert('상품명과 카테고리를 모두 입력해 주세요.');
      return;
    }
    if (regPrice === '' || Number.isNaN(priceNum) || priceNum <= 0) {
      alert('가격은 1원 이상의 올바른 숫자로 입력해 주세요.');
      return;
    }
    if (
      regQuantity === '' ||
      Number.isNaN(quantityNum) ||
      quantityNum < 1 ||
      !Number.isInteger(quantityNum)
    ) {
      alert('수량은 1개 이상의 정수로 입력해 주세요.');
      return;
    }

    const newProduct = {
      itemName: trimmedName,
      price: priceNum,
      quantity: quantityNum,
      category: regCategory,
    };

    console.log('상품이 등록되었습니다.');
    console.log(newProduct);

    // 입력창 초기화
    setRegName('');
    setRegPrice('0');
    setRegQuantity('0');
    setRegCategory('');
  };

  // 재고 추가 핸들러
  const handleAddStock = (e) => {
    e.preventDefault();

    const trimmedName = addName.trim();
    const quantityNum = Number(addQuantity);

    if (!trimmedName) {
      alert('상품명을 입력해 주세요.');
      return;
    }
    if (
      addQuantity === '' ||
      Number.isNaN(quantityNum) ||
      quantityNum < 1 ||
      !Number.isInteger(quantityNum)
    ) {
      alert('추가할 수량은 1개 이상의 정수로 입력해 주세요.');
      return;
    }

    const stockData = {
      itemName: trimmedName,
      quantity: quantityNum,
    };

    console.log('재고가 추가되었습니다.');
    console.log(stockData);

    setAddName('');
    setAddQuantity('0');
  };

  // 상품 삭제 핸들러
  const handleDelete = (e) => {
    e.preventDefault();

    const trimmedName = delName.trim();

    if (!trimmedName) {
      alert('삭제할 상품명을 입력해 주세요.');
      return;
    }

    const deleteData = {
      itemName: trimmedName,
    };

    console.log('상품이 삭제되었습니다.');
    console.log(deleteData);

    setDelName('');
  };

  return (
    <main className="admin-page">
      {/* 1. 상품 등록 섹션 */}
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

      {/* 2. 재고 추가 섹션 */}
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

      {/* 3. 상품 삭제 섹션 */}
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