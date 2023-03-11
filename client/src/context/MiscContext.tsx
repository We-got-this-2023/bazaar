import { Context, createContext, useContext, useState } from "react";
import isEmptySearch from "../utils/isEmptySearch";

interface MiscContextI extends Context<{}> {
  searchEmpty: boolean;
  cart: Product[];
  cartAddItem: (item: Product) => void;
  cartRemoveItem: (item: Product) => void;
}

export type Product = {
  id: string;
  title: string;
  price: string;
  quantity: number;
  description: string;
  images: string[];
  tags: string[];
  userId: string;
  createdAt: string;
};

const MiscContext = createContext({}) as MiscContextI;

export function MiscProvider({ children }: { children: JSX.Element }) {
  const [searchIsEmpty, setSearchIsEmpty] = useState<boolean>(isEmptySearch());
  function getCart() {
    const cart = localStorage.getItem("cart");
    if (cart) return JSON.parse(cart);
    return [];
  }
  const [cart, setCart] = useState<Product[]>(getCart());
  function cartAddItem(item: Product) {
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  function cartRemoveItem(id: string) {
    setCart(cart.filter((item) => item.id !== id));
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  const value = { searchIsEmpty, cart, cartAddItem, cartRemoveItem };

  return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>;
}

export function useMisc() {
  return useContext(MiscContext) as MiscContextI;
}
