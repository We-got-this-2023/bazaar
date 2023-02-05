import { Link } from "react-router-dom";
import CartIcon from "../assets/CartIcon";
import DefaultImage from "../assets/DefaultImage";
import Logo from "../assets/Logo";
import SearchIcon from "../assets/SearchIcon";

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
        <p className="nav_name font-logo text-4xl">Bazaar</p>
      </div>
      <div className="relative ml-10 flex items-center">
        <SearchIcon className="absolute left-1 h-6 bg-transparent" />
        <input
          className="nav_searchBar bg-white-bright rounded-md py-1 pl-8 pr-48 font-sans dark:bg-neutral-800"
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
