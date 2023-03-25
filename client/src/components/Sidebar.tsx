import { NavLink } from "react-router-dom";
import OrdersIcon from "../assets/OrdersIcon";
import ProductsIcon from "../assets/ProductsIcon";
import UserIcon from "../assets/UserIcon";

export default function Sidebar() {
  return (
    <nav className="absolute right-8 top-8">
      <ul className="flex flex-col gap-12">
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "relative before:absolute before:-left-4 before:top-0 before:right-0 before:bottom-0 before:m-auto before:h-32 before:w-32 before:rounded-2xl before:border-4 before:border-black before:opacity-50 before:content-[''] after:absolute after:-left-4 after:top-0 after:right-0 after:bottom-0 after:m-auto after:h-32 after:w-32 after:rounded-2xl after:bg-black after:opacity-10 after:content-[''] dark:before:border-white dark:after:bg-white"
              : ""
          }
        >
          <UserIcon className="w-24" />
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            isActive
              ? "relative before:absolute before:-left-4 before:top-0 before:right-0 before:bottom-0 before:m-auto before:h-32 before:w-32 before:rounded-2xl before:border-4 before:border-black before:opacity-50 before:content-[''] after:absolute after:-left-4 after:top-0 after:right-0 after:bottom-0 after:m-auto after:h-32 after:w-32 after:rounded-2xl after:bg-black after:opacity-10 after:content-[''] dark:before:border-white dark:after:bg-white"
              : ""
          }
        >
          <OrdersIcon className="w-24" />
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "relative before:absolute before:-left-4 before:top-0 before:right-0 before:bottom-0 before:m-auto before:h-32 before:w-32 before:rounded-2xl before:border-4 before:border-black before:opacity-50 before:content-[''] after:absolute after:-left-4 after:top-0 after:right-0 after:bottom-0 after:m-auto after:h-32 after:w-32 after:rounded-2xl after:bg-black after:opacity-10 after:content-[''] dark:before:border-white dark:after:bg-white"
              : ""
          }
        >
          <ProductsIcon className="w-24" />
        </NavLink>
      </ul>
    </nav>
  );
}
