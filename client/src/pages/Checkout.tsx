import { Link } from "react-router-dom";
import CheckoutSummary from "../cards/Checkout";
import ProductPreview from "../cards/Product";
import DeliveryForm from "../cards/Shipping";
import { useAuth } from "../contexts/AuthContext";
import { Product, useMisc } from "../contexts/MiscContext";

export default function Checkout() {
  const { user } = useAuth();
  // Leaving cartAddItem to add mock data for now
  const { cart: items, checkoutPrice, trashCart } = useMisc();

  return (
    <div className="flex w-full justify-between px-8">
      {items.length ? (
        <div className="flex w-full flex-col items-center p-2">
          <div className="flex w-full">
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
            <CheckoutSummary
              className="w-[25rem]"
              price={checkoutPrice.toString()}
            />
          </div>
          <button
            onClick={trashCart}
            className="cursor-pointer rounded-md py-2 px-4 text-red-500 transition-all duration-100 hover:bg-black"
          >
            Trash Order
          </button>
        </div>
      ) : (
        <div className="m-4 flex w-full flex-col items-center gap-8">
          <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
          <Link to="/search" className="hover:text-sky-400 hover:underline">
            Look for some products to add to your cart!
          </Link>
        </div>
      )}
    </div>
  );
}
