import { Routes, Route } from "react-router-dom";
import ItemInfo from "./pages/ItemInfo";
import Items from "./pages/Items";
import Home from "./pages/Home";
import About from "./pages/About";

function App() {
  return (
    <div className="bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:id" element={<ItemInfo />} />
      </Routes>
    </div>
  );
}

export default App;
