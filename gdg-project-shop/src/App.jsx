import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Footer from './components/Footer';
import CategoryPage from './pages/CategoryPage';
import SortPage from './pages/SortPage';
import PricePage from './pages/PricePage'; 
import { getProducts } from './apis/products';
import AdminPage from './pages/AdminPage';


function App() {
  const [cart, setCart] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const location = useLocation();

  // 페이지를 옮길 때마다 서버에서 상품 목록을 다시 받아와요.
  // (관리자 페이지에서 등록/재고 추가/삭제한 내용이 바로 보이도록)
  useEffect(() => {
    if (location.pathname === '/admin') return;

    const loadProducts = async () => {
      try {
        const data = await getProducts();
        setItems(data);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [location.pathname]);


  const showPage = (page) => {
    if (isLoading) {
      return <p className="text-center mt-10">Loading...</p>;
    }
    if (isError) {
      return (
        <p className="text-center mt-10 text-red-500">상품을 불러오지 못했어요. 잠시 후 다시 시도해주세요.</p>
      );
    }
    return page;
  };


  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={showPage(<Content items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/category" element={showPage(<CategoryPage items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/price" element={showPage(<PricePage items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/sort" element={showPage(<SortPage items={items} cart={cart} setCart={setCart} />)} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
      <Footer cart={cart} />
    </div>
  );
}
export default App;