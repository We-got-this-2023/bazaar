import { Context, createContext, useContext, useEffect, useState } from "react";
import isEmptySearch from "../utils/isEmptySearch";

interface MiscContextI extends Context<{}> {
  searchEmpty: boolean;
  cart: Product[];
  cartNumber: number;
  cartAddItem: (item: Product) => void;
  cartRemoveItem: (item: Product) => void;
  changeQuantity: (product: Product, number: number) => void;
  checkoutPrice: number;
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
  const [cartNumber, setCartNumber] = useState<number>(0);
  const [cart, setCart] = useState<Product[]>([]);
  const [checkoutPrice, setCheckoutPrice] = useState<string>("0.00");
  useEffect(() => {
    setCart(getCart());
  }, []);

  function resetCartNumber(passCart: Product[]) {
    let number = 0;
    for (let i = 0; i < passCart.length; i++) number += passCart[i].quantity;
    setCartNumber(number);
  }

  function getCheckoutPrice(passCart: Product[]) {
    let price = 0;
    for (let i = 0; i < passCart.length; i++) {
      price += passCart[i].price * passCart[i].quantity;
    }
    const split = price.toString().split(".");
    let dol, cen;
    if (split.length > 1) cen = split[1];
    else cen = "00";
    dol = split[0];
    const retPrice = dol + "." + cen;
    setCheckoutPrice(retPrice);
  }

  function updateCartInfo(passCart: Product[]) {
    resetCartNumber(passCart);
    getCheckoutPrice(passCart);
  }

  function getCart() {
    const stored = localStorage.getItem("cart");
    let newCart;
    if (stored) newCart = JSON.parse(stored);
    if (newCart) {
      newCart = newCart.filter(
        (item: Product) =>
          typeof item.quantity === "number" && item.quantity > 0
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      updateCartInfo(newCart);
      return newCart;
    }
    return [];
  }
  function cartAddItem(item: Product) {
    const cartItem = cart.find((cartItem) => cartItem.id === item.id) || null;
    changeQuantity(item, cartItem ? cartItem.quantity + 1 : 1);
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

  function cartRemoveAllItem(id: number) {
    const newCart = cart.filter((item) => item.id !== Number(id));
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCartInfo(newCart);
  }

  function changeQuantity(product: Product, quantity: number) {
    if (typeof quantity !== "number") return;
    if (quantity == 0) {
      cartRemoveAllItem(product.id);
      updateCartInfo(cart);
      return;
    }
    const newCart: Product[] = [];
    let hasChanged = false;
    for (let i = 0; i < cart.length; i++) {
      newCart.push(cart[i]);
      if (cart[i].id === product.id) {
        newCart[i].quantity = quantity;
        hasChanged = true;
      }
      setCart([...newCart]);
      localStorage.setItem("cart", JSON.stringify([...newCart]));
      updateCartInfo([...newCart]);
    }
    if (!hasChanged) {
      product.quantity = quantity;
      newCart.push(product);
      setCart([...newCart]);
      localStorage.setItem("cart", JSON.stringify([...newCart]));
      updateCartInfo([...newCart]);
    }
  }

  const value = {
    searchIsEmpty,
    cart,
    cartAddItem,
    cartRemoveItem,
    changeQuantity,
    cartNumber,
    checkoutPrice,
  };

  return <MiscContext.Provider value={value}>{children}</MiscContext.Provider>;
}

export function useMisc() {
  return useContext(MiscContext) as MiscContextI;
}
