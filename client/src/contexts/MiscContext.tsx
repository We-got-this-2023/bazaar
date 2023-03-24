import { Context, createContext, useContext, useState } from "react";
import isEmptySearch from "../utils/isEmptySearch";

interface MiscContextI extends Context<{}> {
  searchEmpty: boolean;
  cart: Product[];
  cartAddItem: (item: Product) => void;
  cartRemoveItem: (item: Product) => void;
}

export type Product = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description: string;
  images: string[];
  tags: string[];
  userId: number;
  createdAt: string;
  file?: File;
  category: string;
  imagesPath?: string[];
};

const MiscContext = createContext({}) as MiscContextI;

export function MiscProvider({ children }: { children: JSX.Element }) {
  // leaving this unused function for now
  // This is because I haven't set up the search for no results yet
  const [searchIsEmpty, setSearchIsEmpty] = useState<boolean>(isEmptySearch());

  function getCart() {
    const cart = localStorage.getItem("cart");
    if (cart) return JSON.parse(cart);
    return [];
  }
  const [cart, setCart] = useState<Product[]>(getCart());
  function cartAddItem(item: Product) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === item.id) {
        cart[i].quantity += item.quantity;
        setCart([...cart]);
        localStorage.setItem("cart", JSON.stringify(cart));
        return;
      }
    }
    item.quantity = 1;
    setCart([...cart, item]);
    if (!localStorage.getItem("cart"))
      localStorage.setItem("cart", `[${JSON.stringify(item)}]`);
    else localStorage.setItem("cart", JSON.stringify(cart));
  }
  function cartRemoveItem(id: number) {
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id === id) {
        if (cart[i].quantity > 1) {
          cart[i].quantity -= 1;
          if (cart[i].quantity === 0) {
            setCart(cart.filter((item) => item.id !== Number(id)));
            localStorage.setItem("cart", JSON.stringify(cart));
            return;
          } else {
            setCart([...cart]);
            localStorage.setItem("cart", JSON.stringify(cart));
            return;
          }
        }
      }
    }
    setCart(cart.filter((item) => item.id !== Number(id)));
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const value = { searchIsEmpty, cart, cartAddItem, cartRemoveItem };

  return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>;
}

export function useMisc() {
  return useContext(MiscContext) as MiscContextI;
}
