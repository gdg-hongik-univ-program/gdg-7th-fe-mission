import { useState } from "react";

function ManagementPage() {
  // 1) 입력값 state
  const [product, setProduct] = useState({
    itemName: "",
    price: 0,
    quantity: 0,
    category: "",
  });
  const [stock, setStock] = useState({ itemName: "", quantity: 0 });
  const [removeName, setRemoveName] = useState("");

  // 2) 핸들러: 객체를 만들어 콘솔에 출력
  const handleRegister = (e) => {
    e.preventDefault();
    const newProduct = {
      itemName: product.itemName,
      price: Number(product.price),
      quantity: Number(product.quantity),
      category: product.category,
    };
    console.log("[상품 등록] 상품 등록을 실행합니다.", newProduct);
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    const stockData = {
      itemName: stock.itemName,
      quantity: Number(stock.quantity),
    };
    console.log("[재고 추가] 재고 추가를 실행합니다.", stockData);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    const removeData = { itemName: removeName };
    console.log("[상품 삭제] 상품 삭제를 실행합니다.", removeData);
  };

  // 3) UI
  return (
    <main className="content management-page">
      {/* 상품 등록 */}
      <section className="management-section">
        <h2>상품 등록</h2>
        <form className="management-card" onSubmit={handleRegister}>
          <div className="management-grid">
            <label className="management-field">
              <span>상품명</span>
              <input
                type="text"
                placeholder="상품명 입력..."
                value={product.itemName}
                onChange={(e) =>
                  setProduct({ ...product, itemName: e.target.value })
                }
              />
            </label>
            <label className="management-field">
              <span>수량</span>
              <input
                type="number"
                min="0"
                value={product.quantity}
                onChange={(e) =>
                  setProduct({ ...product, quantity: e.target.value })
                }
              />
            </label>
            <label className="management-field">
              <span>가격</span>
              <input
                type="number"
                min="0"
                value={product.price}
                onChange={(e) =>
                  setProduct({ ...product, price: e.target.value })
                }
              />
            </label>
            <label className="management-field">
              <span>카테고리</span>
              <input
                type="text"
                placeholder="카테고리 선택"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
            </label>
          </div>
          <div className="management-footer">
            <p className="management-note">
              * 추가 기능을 카테고리로 설정한 경우에만 카테고리를 이용해주세요.
            </p>
            <button type="submit" className="management-btn primary">
              등록
            </button>
          </div>
        </form>
      </section>

      {/* 재고 추가 */}
      <section className="management-section">
        <h2>재고 추가</h2>
        <form className="management-card" onSubmit={handleAddStock}>
          <div className="management-grid">
            <label className="management-field">
              <span>상품명</span>
              <input
                type="text"
                placeholder="상품명 입력..."
                value={stock.itemName}
                onChange={(e) =>
                  setStock({ ...stock, itemName: e.target.value })
                }
              />
            </label>
            <label className="management-field">
              <span>수량</span>
              <input
                type="number"
                min="0"
                value={stock.quantity}
                onChange={(e) =>
                  setStock({ ...stock, quantity: e.target.value })
                }
              />
            </label>
          </div>
          <div className="management-footer end">
            <button type="submit" className="management-btn primary">
              추가
            </button>
          </div>
        </form>
      </section>

      {/* 상품 삭제 */}
      <section className="management-section">
        <h2>상품 삭제</h2>
        <form className="management-card" onSubmit={handleRemove}>
          <div className="management-grid">
            <label className="management-field">
              <span>상품명</span>
              <input
                type="text"
                placeholder="상품명 입력..."
                value={removeName}
                onChange={(e) => setRemoveName(e.target.value)}
              />
            </label>
          </div>
          <div className="management-footer end">
            <button type="submit" className="management-btn danger">
              삭제
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default ManagementPage;