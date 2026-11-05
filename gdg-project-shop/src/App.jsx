import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar.jsx";
import Content from "./components/Content.jsx";
import Footer from "./components/Footer.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import PricePage from "./pages/PricePage.jsx";
import SortPage from "./pages/SortPage.jsx";
import "./App.css";
import { useState } from "react";

function App() {
  
  const [cart, setCart] = useState([]);

  function addToCart(newItem) {
  setCart([...cart, newItem]);
  }

  console.log("장바구니:", cart);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Content cart={cart} onAddToCart={addToCart} />} />
        <Route path="/category" element={<CategoryPage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/price" element={<PricePage cart={cart} onAddToCart={addToCart} />} />
        <Route path="/sort" element={<SortPage cart={cart} onAddToCart={addToCart} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App
