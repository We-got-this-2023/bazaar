import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CartIcon from "../assets/CartIcon";
import DefaultImage from "../assets/DefaultImage";
import Logo from "../assets/Logo";
import SearchIcon from "../assets/SearchIcon";
import { handleSearch } from "../pages/Search";
import { toggleTheme } from "../utils/settings";

export default function Navbar() {
  const [cartNumber, setCartNumber] = useState(0);
  const [centerSearchBar, setCenterSearchBar] = useState();
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleSearch = () => {
    if (location.pathname.includes("/search")) {
      navigate(`/search?q=${searchRef.current?.value}`, { replace: true });
      queryClient.clear();
    } else navigate(`/search?q=${searchRef.current?.value}`);
  };

  return (
    <nav className="flex h-16 items-center justify-between gap-4 p-1">
      <SearchIcon
        className="w-6 cursor-pointer max-md:flex md:hidden"
        onClick={handleSearch}
      />
      <div className="flex h-full w-full items-center gap-6">
        <Link
          to="/"
          className="flex items-center justify-center font-logo text-4xl"
        >
          <Logo className="w-14" />
          <span className="relative after:absolute after:-bottom-1 after:left-0 after:right-0 after:mx-auto after:h-2 after:w-0 after:rounded-lg after:bg-black after:transition-all after:duration-200 after:content-[''] hover:after:w-full">
            Bazaar
          </span>
        </Link>
        <div
          className={`${
            centerSearchBar ? "hidden " : ""
          }opacity flex max-w-md shrink grow gap-2 rounded-lg bg-white-bright p-2 shadow-blue-200 ring-blue-200 transition-all duration-200 focus-within:shadow-[0_0_10px_2px_#bfdbfe] focus-within:ring-[2px] hover:shadow-[0_0_10px_2px_#bfdbfe] dark:bg-neutral-800 dark:focus-within:shadow-[0_0_5px_#bfdbfe] dark:focus-within:ring-1 max-md:hidden`}
        >
          <SearchIcon
            className="w-6 cursor-pointer transition-transform duration-200 hover:scale-110"
            onClick={handleSearch}
          />
          <input
            className="w-full bg-transparent focus:outline-none"
            type="text"
            ref={searchRef}
            placeholder="Search for something..."
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />
        </div>
      </div>
      <div className="flex h-full items-center gap-6">
        <button
          className="rounded-md border-[2.5px] border-black bg-black p-2 font-display font-medium text-white transition-colors duration-150 hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white"
          onClick={toggleTheme}
        >
          Theme
        </button>
        <Link to="/checkout" className="relative">
          <CartIcon
            number={cartNumber}
            className="w-16 transition-transform duration-200 hover:scale-110"
          />
        </Link>
        <Link to="/profile">
          <DefaultImage className="w-16 transition-transform duration-200 hover:scale-110" />
        </Link>
      </div>
    </nav>
  );
}
