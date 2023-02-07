import CartIcon from "../assets/CartIcon";
import Logo from "../assets/Logo";
import MagGlass from "../assets/MagGlass.svg";
import NewCart from "../assets/NewCart";
import SearchIcon from "../assets/SearchIcon";
import UserIcon from "../assets/UserIcon";

export default function Navbar() {
  return (
    <nav className="relative flex items-center">
      <div className="nav_logoContainer flex items-center">
        <Logo className="h-14" />
        <h1 className="font-logo text-4xl">Bazaar</h1>
      </div>
      <div className="relative ml-10 flex items-center">
        <SearchIcon className="nav_magGlass absolute left-1 h-6 bg-transparent" />
        <input
          className="nav_searchBar rounded-md bg-white py-1 pl-8 pr-48 font-sans"
          type="text"
          placeholder="Search for something..."
        />
      </div>

      <div className="absolute right-3 flex h-14 items-center">
        <div className="relative flex items-center">
          <NewCart className=" mr-4 h-14 w-14" />
          <p className="absolute right-9 bg-transparent">5</p>
        </div>
        <UserIcon className="h-10  rounded-full bg-black" />
      </div>
    </nav>
  );
}
