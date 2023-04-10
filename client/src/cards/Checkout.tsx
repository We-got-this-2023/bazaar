import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Product, useMisc } from "../contexts/MiscContext";

interface Props {
  price: string;
  className?: string;
}

export interface Order {
  paymentMethodId: number;
  userId: number;
  orderStatus: string;
  products: Product[];
}

export default function CheckoutSummary({ price, className = "" }: Props) {
  const { cart, setCart, updateCartInfo, isSm } = useMisc();
  const { user } = useAuth();
  const [total, setTotal] = useState("0.00");
  const [tax, setTax] = useState("1.0825");
  const navigate = useNavigate();

  useEffect(() => {
    const thisTax = (parseFloat(price) * 0.0825).toFixed(2);
    const split = thisTax.split("");
    for (let i = 0; i < total.length - 5; i++) {
      split.pop();
    }
    setTax(split.join(""));
    const thisTotal = (parseFloat(price) + parseFloat(thisTax))
      .toFixed(2)
      .toString();
    let dol = thisTotal.split(".")[0];
    let cent;
    if (thisTotal.split(".")[1]) cent = thisTotal.split(".")[1];
    else cent = "00";
    setTotal(dol + "." + cent);
  }, [price]);

  const getOrder = (): Order => {
    const order: Order = {
      paymentMethodId: 0,
      userId: user.id,
      orderStatus: "pending",
      products: cart,
    };
    return order;
  };

  async function submit() {
    try {
      const order = getOrder();
      console.log(order.products);
      if (!order || !order.products || order.products.length === 0)
        throw new Error("Something went wrong");
      const res = await fetch(import.meta.env.VITE_API + "/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer " +
            document.cookie
              .split(";")
              .filter((item) => item.startsWith("token="))[0]
              .split("=")[1],
        },
        body: JSON.stringify(order),
      });
      if (!res.ok) throw new Error("Something went wrong");
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      updateCartInfo([]);
      navigate("/");
      return res.json();
    } catch (err) {
      console.log(err);
      setCart([]);
      localStorage.setItem("cart", JSON.stringify([]));
      updateCartInfo([]);
    }
  }

  return (
    <div
      className={`
        flex h-fit flex-col items-center justify-center
        rounded-xl bg-neutral-200 shadow-[0_0_5px_1px_#00000050] 
        transition-all duration-200 hover:shadow-[0_0_8px_2px_#00000070] 
        dark:bg-neutral-900 dark:shadow-[0_0_5px_1px_#ffffff30] 
        dark:hover:shadow-[0_0_6px_2px_#ffffff50] ${className} ${
        isSm ? "m-4 mt-6 gap-4 px-6 py-10" : "m-8 mt-12 gap-8 px-12 py-20"
      }`}
    >
      <h2 className={`font-bold ${isSm ? "text-lg" : "text-2xl"}`}>Checkout</h2>
      <div className="flex w-full justify-between p-4">
        <div className="flex flex-col justify-start">
          <h3 className={isSm ? "text-sm" : ""}>Subtotal:</h3>
          <h3 className={isSm ? "text-sm" : ""}>Shipping:</h3>
          <h3 className={isSm ? "text-sm" : ""}>Taxes:</h3>
        </div>
        <div className="flex w-1/4 flex-col justify-end">
          <p className={isSm ? "text-sm" : ""}>${price}</p>
          <p className={isSm ? "text-sm" : ""}>$0.00</p>
          <p className={isSm ? "text-sm" : ""}>${tax}</p>
        </div>
      </div>
      <hr className="w-full border-black opacity-60 transition-all duration-200 dark:border-white" />
      <div className="flex w-full justify-between p-4">
        <div className="flex flex-col justify-start">
          <h3 className={`font-bold ${isSm ? "text-sm" : ""}`}>Total:</h3>
        </div>
        <div className="flex w-1/4 flex-col justify-end">
          <p className={`font-bold ${isSm ? "text-sm" : ""}`}>${total}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-8">
        <button
          onClick={submit}
          className={`w-fit outline outline-1 dark:outline-white ${
            isSm ? "rounded-md p-3 text-sm" : "rounded-lg p-4"
          }`}
        >
          Pay Now
        </button>
        <p className={`text-center opacity-50 ${isSm ? "text-xs" : "text-sm"}`}>
          At the moment, we only accept payment through PayPal. We apologize for
          any inconvenience.
        </p>
      </div>
    </div>
  );
}
