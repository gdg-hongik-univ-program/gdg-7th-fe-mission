import { getProducts, purchaseProducts } from './apis/products'
import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import './App.css'
import Content from './components/Content'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import CategoryPage from './pages/CategoryPage'
import PricePage from './pages/PricePage'
import SortPage from './pages/SortPage'
import AdminPage from './pages/AdminPage'

function App() {
  const [products, setProducts] = useState([]); // 상품 목록
  const [cart, setCart] = useState([]);   // [{ id, count }, ...]
  const [isLoading, setIsLoading] = useState(true); // 불러오는 중인가
  const [error, setError] = useState(null); // 에러 메시지
  const location = useLocation(); // 관리자 페이지인지
  const isAdmin = location.pathname.startsWith("/admin");

  // 처음 화면이 나올 때 상품을 불러와서 state에 저장
  // useEffect(() => {할 일}, 읜존성배열);의 구조
  useEffect(() => {
    // 상품을 불러오는 함수 정의
    async function loadProducts() {
      try{
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
        setError("상품을 불러오지 못했어요.");
      }finally {
        setIsLoading(false);
      }
    } // 함수 바로 부르기
    loadProducts();
  }, []);

  // 서버 데이터가 바뀐 뒤 상품 목록을 다시 불러오기
  async function refreshProducts() {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  // 장바구니 일괄 구매
  async function handlePurchase() {
    if (cart.length === 0) {
      alert("장바구니가 비어 있어요.");
      return;
    }
    try {
      const result = await purchaseProducts(cart);
      console.log(result);
      alert(`총 ${result.totalPrice.toLocaleString()}원 구매 완료!`);
      setCart([]);               // 장바구니 비우기
      await refreshProducts();   // 줄어든 재고 다시 받아오기
    } catch (error) {
      console.error(error);
      alert("구매에 실패했어요.");
    }
  }

  function handleAddToCart(id, count) {
    setCart((prev) => {
      if (prev.some((item) => item.id === id)) return prev;
      return [...prev, { id, count }];
    });
  }

  return (
    <div>
      <Navbar />
      {isLoading ? (
        <p className="py-20 text-center text-gray-500 text-[40px]">Loading...</p>
      ) : error ? (
        <p className="py-20 text-center text-red-500 text-[40px]">{error}</p>
      ) : (
      <Routes>
        <Route path="/" element={<Content />} />
        <Route path="/category" element={<CategoryPage products={products} cart={cart} onAddToCart={handleAddToCart} />} />
        <Route path="/price" element={<PricePage products={products} cart={cart} onAddToCart={handleAddToCart} />} />
        <Route path="/sort" element={<SortPage products={products} cart={cart} onAddToCart={handleAddToCart} />} />
        <Route path="/admin" element={<AdminPage onRefresh={refreshProducts} />} />
      </Routes>
      )}
      {!isAdmin && <Footer onPurchase={handlePurchase} />}
    </div>
  )
}

export default App