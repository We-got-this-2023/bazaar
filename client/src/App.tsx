import { Routes, Route, Outlet } from "react-router-dom";
import ProductInfo from "./pages/ProductInfo";
import Products from "./pages/Products";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<LayoutWithNavbar />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductInfo />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* Routes without a navbar */}
        <Route path="/login" element={<Login />} />
        {/*
          We need these routes added:
          profile
          profile/:id
          cart
          checkout
          signup
          feed? or make home the feed
         */}
      </Routes>
    </div>
  );
}
