import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeliveryForm from "../components/DeliveryForm";
import ProductPreview from "../components/ProductPreview";
import { useAuth } from "../context/AuthContext";
import { Product, useMisc } from "../context/MiscContext";

export default function Checkout() {
  const { user } = useAuth();
  const { cart: items, cartAddItem } = useMisc();
  const navigate = useNavigate();

  useEffect(() => {
    // cartAddItem({
    //   id: "Something",
    //   title: "something",
    //   price: "10.24",
    //   quantity: 1,
    //   description: "this is a something",
    //   images: [],
    //   tags: [],
    //   userId: "",
    //   createdAt: "",
    // });
    if (items.length === 0) navigate("/");
  }, []);

  return (
    <div className="flex h-full w-full">
      <div className="m-4 flex w-2/3 flex-col">
        <div className="flex flex-col">
          <h1>Review Items</h1>
          <div>
            <div className="flex flex-col gap-3">
              {items.map((item: Product) => {
                return (
                  <ProductPreview
                    product={item}
                    type="checkout"
                    key={item.id}
                    amount={item.quantity}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <DeliveryForm title="Shipping" user={user} />
      </div>
      <div className="m-8 flex w-1/3 flex-col items-center justify-center gap-6 rounded-3xl border-[.5px] border-black bg-neutral-200 p-12 shadow-[0_0_5px_1px_#00000050] transition-all duration-200 hover:shadow-[0_0_8px_2px_#00000070] dark:border-white dark:bg-neutral-900 dark:shadow-[0_0_5px_1px_#ffffff80] dark:hover:shadow-[0_0_10px_2px_#ffffff90]">
        <h1>Checkout</h1>
        <div></div>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-[.5px] border-black bg-neutral-200 p-12 shadow-[0_0_5px_1px_#00000050] transition-all duration-200 hover:shadow-[0_0_8px_2px_#00000070] dark:border-white dark:bg-neutral-900 dark:shadow-[0_0_5px_1px_#ffffff80] dark:hover:shadow-[0_0_10px_2px_#ffffff90]">
<h1 className="text-2xl font-bold">My Profile</h1> */
}
