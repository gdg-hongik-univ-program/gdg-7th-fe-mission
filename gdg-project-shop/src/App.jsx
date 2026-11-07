import './App.css'
import { Route, RouterContextProvider, Routes } from 'react-router'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import Category from './components/pages/Category.jsx'
import Price from './components/pages/Price.jsx'
import Sort from './components/pages/Sort.jsx'

import { useState } from 'react'

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (id, count) => {
    setCart((prev) => [...prev, {id, count}]);
  };

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home addToCart={addToCart} cart={cart}/>}/>
      <Route path="/category" element={<Category addToCart={addToCart} cart={cart}/>}/>
      <Route path="/price-bound" element={<Price addToCart={addToCart} cart={cart}/>}/>
      <Route path="/sort" element={<Sort addToCart={addToCart} cart={cart}/>}/>
    </Routes>
    
    <Footer/>
    </>
  )
}

export default App
