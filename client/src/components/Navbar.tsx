import { Link } from "react-router-dom";
import CartIcon from "../assets/CartIcon";
import DefaultImage from "../assets/DefaultImage";
import Logo from "../assets/Logo";
import MagGlass from "../assets/MagGlass.svg";
import NewCart from "../assets/NewCart";
import SearchIcon from "../assets/SearchIcon";
import UserIcon from "../assets/UserIcon";

export default function Navbar() {
  /*
  You might consider avoiding naming your elements with "nav_name" or "nav_searchBar" because
  we're using Tailwind. The point of Tailwind is to avoid writing unnecessary CSS classes.
  I won't remove it because it's not "wrong", but that's just something to keep in mind when
  you're writing CSS with Tailwind.
  */

  const number = 5;
  return (
    <nav className="relative flex items-center">
      <div className="nav_logoContainer flex items-center">
        <Logo className="h-14" />
        <p className="nav_name text-4xl">Bazaar</p>
      </div>
      <div className="relative ml-10 flex items-center">
        <img
          src={MagGlass}
          className="nav_magGlass absolute left-1 h-6 bg-transparent"
        />
        <input
          className="nav_searchBar rounded-md bg-white-bright py-1 pl-8 pr-48 font-sans"
          type="text"
          placeholder="Search for something..."
        />
      </div>

      <div className="absolute right-3 flex h-14 items-center">
        <div className="relative flex items-center">
          <Link to="/checkout">
            <CartIcon number={number} className="h-16" />
          </Link>
        </div>
        <DefaultImage className="mt-4 h-16" />
      </div>
    </nav>
  );
}
