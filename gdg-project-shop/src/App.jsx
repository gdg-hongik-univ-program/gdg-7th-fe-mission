import './App.css'
import { Route, RouterContextProvider, Routes } from 'react-router'
import { useEffect, useState } from 'react';
import { getProducts } from './apis/products.js';
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import Footer from './components/Footer.jsx'
import Category from './components/pages/Category.jsx'
import Price from './components/pages/Price.jsx'
import Sort from './components/pages/Sort.jsx'
import Manage from './manage/Manage.jsx';


function App() {
  const [cart, setCart] = useState([]);
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addToCart = (id, count) => {
    setCart((prev) => [...prev, {id, count}]);
  };
  
  useEffect(()=>{
    const load = async () =>{
      try{
      const products = await getProducts();
      setItem(products);
      } catch (err){
        setError(err.message);
      } finally{
        setLoading(false);
      }
    };
    load();
  },[]);
  
  if(loading) return <p className='flex justify-center items-center h-screen font-extrabold'>Loading...</p>
  if(error) return <p className='flex justify-center items-center h-screen font-extrabold text-red-500'>Error!!!</p>

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home item={item} addToCart={addToCart} cart={cart}/>}/>
      <Route path="/category" element={<Category item={item} addToCart={addToCart} cart={cart}/>}/>
      <Route path="/price-bound" element={<Price item={item} addToCart={addToCart} cart={cart}/>}/>
      <Route path="/sort" element={<Sort addToCart={addToCart} cart={cart}/>}/>
      <Route path='/manage' element={<Manage></Manage>}/>
    </Routes>
    
    <Footer/>
    </>
  )
}

export default App
