import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Checkout from "./pages/Checkout";
import EditProduct from "./pages/Edit";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Orders from "./pages/OrderHistory";
import ProductsPage from "./pages/ProductsPage";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import Signup from "./pages/Signup";

function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function LayoutWithSidebar() {
  return (
    <div className="relative">
      <Outlet />
      <Sidebar />
    </div>
  );
}

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutWithNavbar />}>
          <Route index element={<LandingPage />} />
          <Route element={<LayoutWithSidebar />}>
            <Route path="search" element={<Search />} />
            <Route path="profile/:id" element={<Profile />} />
            <Route
              path="orders"
              element={<ProtectedRoute element={<Orders />} />}
            />
            <Route path="*" element={<NotFound />} />
            <Route
              path="products"
              element={<ProtectedRoute element={<ProductsPage />} />}
            />
            <Route
              path="profile"
              element={<ProtectedRoute element={<Profile />} />}
            />
          </Route>
          <Route path="checkout" element={<Checkout />} />
          <Route path="about" element={<About />} />
          <Route
            path="edit"
            element={<ProtectedRoute element={<EditProduct />} />}
          />
          <Route
            path="edit/:id"
            element={<ProtectedRoute element={<EditProduct />} />}
          />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}
