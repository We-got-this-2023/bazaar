import { Routes, Route } from "react-router-dom";
import ProductInfo from "./pages/ProductInfo";
import Products from "./pages/Products";
import Home from "./pages/Home";
import About from "./pages/About";

export default function App() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Products />} />
        <Route path="/items/:id" element={<ProductInfo />} />
      </Routes>
    </div>
  );
}
