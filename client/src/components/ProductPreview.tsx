import { Link } from "react-router-dom";
import { FancyInput as Input } from "./Input";

type Product = {
  id: string;
  title: string;
  price: string;
  description: string;
  images: string[];
  createdAt: string;
  tags: string[];
  userId: string;
};

export default function ProductPreview({
  product,
  type,
  amount,
}: {
  product: Product;
  type?: string;
  amount?: number;
}) {
  const { id, price, title, images, createdAt, tags, userId, description } =
    product;
  const split = price.split(".");
  let first = split[0],
    second;

  if (split.length === 1) second = "00";
  else second = split[1];

  const d = "$" + first;
  let c = second;
  if (second.length === 1) c = `${second}0`;

  return (
    <div className="rounded-3xl bg-neutral-200 px-8 py-4 shadow-[3px_3px_10px_1px_#00000060] transition-all duration-200 hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_12px_2px_#00000060] hover:brightness-105 dark:bg-neutral-900 dark:hover:brightness-110">
      <Link to={`/products/${id}`}>
        <h2 className="w-fit font-body text-lg hover:text-sky-500 hover:underline">
          {title}
        </h2>
      </Link>
      <div className="flex justify-between gap-20 p-3">
        <div className="flex flex-col justify-between">
          <div className="flex w-32 items-start">
            <span className="py-[.5rem] text-2xl font-bold">{d}</span>
            <span className="text-xl">{c}</span>
          </div>
          {type === "checkout" && amount && (
            <Input
              name="quantity"
              type="number"
              initialValue={amount.toString()}
              className="w-20"
            />
          )}
        </div>
        <p className="w-full opacity-50">{description}</p>
      </div>
    </div>
  );
}
