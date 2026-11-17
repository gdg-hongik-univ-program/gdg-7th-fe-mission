import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import PricePage from "./pages/PricePage";
import SortPage from "./pages/SortPage";
import { getProducts, purchaseProducts } from "./apis/products";
import "./App.css";
import AdminPage from "./pages/AdminPage";
import { useCart } from "./stores/cartContext";
import useProducts from "./hooks/useProducts";

function App() {
  const { cart, clearCart } = useCart();
  const { products, setProducts, loading, error } = useProducts();
  const handlePurchase = async () => {
    if (cart.length === 0) {
      alert("장바구니가 비어 있습니다.");
      return;
    }

    try {
      const result = await purchaseProducts(cart);
      console.log("구매 완료", result);
      alert(`총 ${result.totalPrice}원 구매가 완료되었습니다.`);

      clearCart();

      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <main className="content">
          <p>Loading...</p>
        </main>
      ) : error ? (
        <main className="content">
          <p>{error}</p>
        </main>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route
            path="/category"
            element={<CategoryPage products={products} />}
          />
          <Route path="/price" element={<PricePage />} />
          <Route path="/sort" element={<SortPage products={products} />} />
          <Route
            path="/admin"
            element={<AdminPage setProducts={setProducts} />}
          />
        </Routes>
      )}
      <Footer onPurchase={handlePurchase} />
    </>
  );
}

export default App;
