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

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await products();
                console.log(data);
                setItemData(data);
            } catch (error) {
                console.error("상품 데이터를 불러오는 데 실패했습니다:", error);
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
