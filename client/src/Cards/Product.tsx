import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "../assets/EditIcon";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../contexts/MiscContext";
import Form from "../formElements/Form";
import Input from "../formElements/Input";

export default function ProductPreview({
  product,
  type,
  amount,
}: {
  product: Product;
  type?: string;
  amount?: number;
}) {
  const { user, userLoggedIn } = useAuth();
  const [isOwner, setIsOwner] = useState(false);
  const { id, price, name, description, userId } = product;
  useEffect(() => {
    if (userLoggedIn) {
      if (user.id === product.userId) setIsOwner(true);
      else setIsOwner(false);
    }
  }, [user]);
  const split = price.toString().split(".");
  let first = split[0],
    second;

  async function changeQuantity(number: string) {
    // Need to add Change Quantity function from client/src/components/Cart.tsx
    // Will do it later
  }

  if (split.length === 1) second = "00";
  else second = split[1];

  const d = "$" + first;
  let c = second;
  if (second.length === 1) c = `${second}0`;

  const checkout = type === "checkout" ? "py-4 px-8" : "py-6 px-8";

  return (
    <div className="flex h-fit gap-2">
      {/* Images path not functional at the moment */}
      {/* {product?.imagesPath?.length && (
        <img
          src={`${import.meta.env.VITE_API}/${product.imagesPath[0]}`}
          crossOrigin="anonymous"
          alt="Product Image"
          className="flex aspect-square h-full items-center justify-center rounded-3xl bg-neutral-200 object-cover transition-colors duration-200 dark:bg-neutral-900"
        />
      )} */}
      <div
        className={`
      ${checkout} relative flex w-full rounded-3xl bg-neutral-200
      shadow-[3px_3px_10px_1px_#00000060] transition-all duration-200 
      hover:-translate-y-[2px] hover:-translate-x-[2px] 
      hover:shadow-[4px_4px_12px_2px_#00000060] hover:brightness-105 
      dark:bg-neutral-900 dark:hover:brightness-110
      `}
      >
        <div>
          <Link to={`/products/${id}`} className="w-fit">
            <h2 className="w-fit font-body text-lg hover:text-sky-500 hover:underline">
              {name}
            </h2>
          </Link>
          <div className="flex justify-start gap-4">
            <div className="flex flex-col">
              <div className="flex w-32 items-start">
                <span className="py-[.5rem] text-2xl font-bold">{d}</span>
                <span className="text-lg">{c}</span>
              </div>
              {type === "checkout" && amount && (
                <Form onSubmit={changeQuantity}>
                  <Input
                    name="Quantity"
                    type="number"
                    initialValue={amount.toString()}
                    className="w-20"
                    onChange={(e) => {
                      if (e.target.value === "" || parseInt(e.target.value) < 0)
                        e.target.value = "0";
                      if (parseInt(e.target.value) !== amount)
                        changeQuantity(e.target.value);
                    }}
                  />
                </Form>
              )}
            </div>
            <p className="w-full opacity-50">{description}</p>
          </div>
        </div>
        {type === "products-page" && (
          <Link to={`/edit/${id}`} className="absolute top-3 right-3">
            <EditIcon className="w-12" />
          </Link>
        )}
      </div>
    </div>
  );
}
