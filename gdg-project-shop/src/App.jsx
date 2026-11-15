import './App.css';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Routes, Route } from "react-router";
import Category from './pages/Category';
import Sort from './pages/Sort';
import { products } from './apis/products.js';

function App() {
  const [cart, setCart] = useState([]);
  const [itemData, setItemData] = useState([]);
  const [loading, setLoading] = useState("pending");

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          setLoading("loading");
          const data = await products();
          console.log(data);
          setItemData(data);
        } catch (error) {
          setLoading("rejected");
          console.error("상품 데이터를 불러오는 데 실패했습니다:", error);
        } finally {
          setLoading("settled");
        }
      };

        fetchProducts();
    }, []);

  console.log(cart);

  const addCart = object => {
    setCart([...cart, object]);
  }

  return (
    <>
      <Navbar />
      <div className="p-8">
          {loading=="loading" ? "Loading..." : loading=="rejected" ? "Error!" : loading=="pending" ? "Wait..." : ""}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/category" element={<Category cart={cart} addCart={addCart} itemData={itemData} />}></Route>
          <Route path="/sort-items" element={<Sort cart={cart} addCart={addCart} itemData={itemData} />}></Route>
        </Routes>
      </div>
      <Footer cart={cart} />
    </>
  )
}

export default App;
