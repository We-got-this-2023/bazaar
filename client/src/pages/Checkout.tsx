import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CheckoutSummary from "../Cards/Checkout";
import ProductPreview from "../Cards/Product";
import DeliveryForm from "../Cards/Shipping";
import { useAuth } from "../contexts/AuthContext";
import { Product, useMisc } from "../contexts/MiscContext";

export default function Checkout() {
  const { user } = useAuth();
  // Leaving cartAddItem to add mock data for now
  const { cart: items, cartAddItem } = useMisc();
  const navigate = useNavigate();

  useEffect(() => {
    // Until we have a way to add a product to the cart,
    // I'm leaving this commented out function which will run on load
    // each time, as this is a quick way to add products to the cart.

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
    <div className="flex h-full w-full justify-between px-8">
      <div className="m-4 flex w-full max-w-3xl flex-col gap-8">
        <div className="flex flex-col">
          <h1 className="self-center pb-12 pt-6 text-2xl font-bold">
            Review Items
          </h1>
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
        <DeliveryForm
          title="Shipping"
          user={user}
          className="w-fit self-center"
        />
      </div>
      <CheckoutSummary className="w-[25rem]" price="23.43" />
    </div>
  );
}
