import { useState } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../assets/CartIcon";
import DefaultImage from "../assets/DefaultImage";
import Logo from "../assets/Logo";
import SearchIcon from "../assets/SearchIcon";

export default function Navbar() {
  const [cartNumber, setCartNumber] = useState(0);
  return (
    <nav className="relative flex items-center p-1">
      <div className="flex items-center">
        <Link to="/posts" className="flex items-center justify-center">
          <Logo className="w-14" />
          <p className="font-logo text-4xl">Bazaar</p>
        </Link>
      </div>
      <div className="relative ml-10 flex w-[30em] items-center gap-2 rounded-lg bg-white-bright p-2 ring-blue-200 focus-within:ring-2">
        <SearchIcon className="w-6" />
        <input
          className="w-full focus:outline-none"
          type="text"
          placeholder="Search for something..."
        />
      </div>

      <div className="absolute right-3 flex h-14 items-center gap-4">
        <div className="relative flex items-center">
          <Link to="/checkout">
            <CartIcon number={cartNumber} className="w-16" />
          </Link>
        </div>
        <DefaultImage className="w-16 cursor-pointer" />
      </div>
    </nav>
  );
}
