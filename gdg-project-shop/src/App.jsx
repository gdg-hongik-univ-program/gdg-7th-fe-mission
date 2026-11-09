import './App.css';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';
import { Routes, Route } from "react-router";
import Category from './pages/Category';
import Sort from './pages/Sort';

function App() {
  const [cart, setCart] = useState([]);

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
          <Route path="/category" element={<Category cart={cart} addCart={addCart} />}></Route>
          <Route path="/sort-items" element={<Sort cart={cart} addCart={addCart} />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App;
