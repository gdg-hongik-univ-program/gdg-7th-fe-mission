import "./styles/App.css";
import { Route, Routes } from "react-router";
import { useProducts } from "./hooks/useProducts.js";
import Navbar from "./layouts/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Footer from "./layouts/Footer.jsx";
import Category from "./pages/Category.jsx";
import Price from "./pages/Price.jsx";
import Sort from "./pages/Sort.jsx";
import Manage from "./pages/Manage.jsx";

function App() {
  const { item, loading, error, refresh } = useProducts();

  if (loading)
    return (
      <p className="flex justify-center items-center h-screen font-extrabold">
        Loading...
      </p>
    );
  if (error)
    return (
      <p className="flex justify-center items-center h-screen font-extrabold text-red-500">
        Error!!!
      </p>
    );

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category" element={<Category item={item} />} />
        <Route path="/price-bound" element={<Price item={item} />} />
        <Route path="/sort" element={<Sort />} />
        <Route path="/manage" element={<Manage refresh={refresh} />} />
      </Routes>

      <Footer refresh={refresh} item={item} />
    </>
  );
}

export default App;
