import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MoreIcon from "../assets/MoreIcon";
import OrdersIcon from "../assets/OrdersIcon";
import ProductsIcon from "../assets/ProductsIcon";
import UserIcon from "../assets/UserIcon";
import { useMisc } from "../contexts/MiscContext";
import { toggleTheme } from "../utils/settings";

export default function Sidebar({ sm }: { sm?: boolean }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { isSm } = useMisc();
  const [size, setSize] = useState(isSm ? "w-12 h-full" : "w-24");
  useEffect(() => {
    if (isSm) setSize("w-12 h-full");
    else setSize("w-24");
  }, [isSm]);
  if (sm && !isSm) return null;
  if (!sm && isSm) return null;
  return (
    <nav
      className={
        isSm
          ? "fixed bottom-0 left-0 z-10 w-full bg-neutral-300 dark:bg-neutral-800"
          : "absolute right-8 top-8"
      }
    >
      <ul
        className={
          "flex " + (isSm ? "h-full justify-around" : "flex-col gap-12")
        }
      >
        {isSm && (
          <button
            className="w-full rounded-md bg-neutral-300 p-2 font-display font-medium transition-all
            duration-150 hover:brightness-90 dark:bg-neutral-800 dark:hover:brightness-110
            "
            onClick={toggleTheme}
          >
            Theme
          </button>
        )}
        <NavLink
          to="/profile"
          className={({ isActive }) => {
            return (
              "flex flex-col items-center gap-1" +
              (!isSm
                ? `
              relative before:absolute before:-left-4 before:top-0 
              before:right-0 before:bottom-0 before:m-auto before:h-32 before:w-32
              before:rounded-2xl before:border-4 before:border-black before:opacity-50 
              before:transition-all before:duration-200 after:absolute after:-left-4 
              after:top-0 after:right-0 after:bottom-0 after:m-auto after:h-32 
              after:w-32 after:rounded-2xl after:bg-black after:opacity-10 
              after:transition-all after:duration-200 hover:before:content-[''] 
              hover:after:content-[''] dark:before:border-white dark:after:bg-white
              `
                : "") +
              (isSm
                ? " flex h-full w-full items-center justify-center bg-neutral-300 p-2 transition-all duration-150 hover:brightness-90 dark:bg-neutral-800 dark:hover:brightness-110"
                : isActive
                ? " before:content-[''] after:content-[''] hover:before:opacity-50 hover:after:opacity-20"
                : " before:content-none after:content-none hover:before:opacity-20 hover:after:opacity-5")
            );
          }}
        >
          <UserIcon className={size} />
          <h3 className={isSm ? "text-base" : "text-xl"}>Profile</h3>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) => {
            return (
              "flex flex-col items-center gap-1" +
              (!isSm
                ? `
              relative before:absolute before:-left-4 before:top-0 before:right-0 
              before:bottom-0 before:m-auto before:h-32 before:w-32 
              before:rounded-2xl before:border-4 before:border-black before:opacity-50 
              before:transition-all before:duration-200 after:absolute after:-left-4 
              after:top-0 after:right-0 after:bottom-0 after:m-auto after:h-32 
              after:w-32 after:rounded-2xl after:bg-black after:opacity-10 
              after:transition-all after:duration-200 hover:before:content-[''] 
              hover:after:content-[''] dark:before:border-white dark:after:bg-white
              `
                : "") +
              (isSm
                ? " flex h-full w-full items-center justify-center bg-neutral-300 p-2 transition-all duration-150 hover:brightness-90 dark:bg-neutral-800 dark:hover:brightness-110"
                : isActive
                ? " before:content-[''] after:content-[''] hover:before:opacity-50 hover:after:opacity-20"
                : " before:content-none after:content-none hover:before:opacity-20 hover:after:opacity-5")
            );
          }}
        >
          <OrdersIcon className={size} />
          <h3 className={isSm ? "text-base" : "text-xl"}>Orders</h3>
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) => {
            return (
              "flex flex-col items-center gap-1" +
              (!isSm
                ? `
              relative before:absolute before:-left-4 before:top-0 before:right-0 
              before:bottom-0 before:m-auto before:h-32 before:w-32 
              before:rounded-2xl before:border-4 before:border-black before:opacity-50 
              before:transition-all before:duration-200 after:absolute after:-left-4 
              after:top-0 after:right-0 after:bottom-0 after:m-auto after:h-32 
              after:w-32 after:rounded-2xl after:bg-black after:opacity-10 
              after:transition-all after:duration-200 hover:before:content-[''] 
              hover:after:content-[''] dark:before:border-white dark:after:bg-white
              `
                : "") +
              (isSm
                ? " flex h-full w-full items-center justify-center bg-neutral-300 p-2 transition-all duration-150 hover:brightness-90 dark:bg-neutral-800 hover:dark:brightness-110"
                : isActive
                ? " before:content-[''] after:content-[''] hover:before:opacity-50 hover:after:opacity-20"
                : " before:content-none after:content-none hover:before:opacity-20 hover:after:opacity-5")
            );
          }}
        >
          <ProductsIcon className={size} />
          <h3 className={isSm ? "text-base" : "text-xl"}>Products</h3>
        </NavLink>
      </ul>
    </nav>
  );
}
