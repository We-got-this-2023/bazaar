import { Link } from "react-router-dom";

export default function ProductPreview({ product }: any) {
  const {
    id,
    price,
    title,
    images,
    createdAt,
    stock,
    tags,
    userId,
    description,
  } = product;

  const [first, second]: [string, string] = price.split(".");

  const d = "$" + first;
  let c = second;
  if (second.length === 1) c = `${second}0`;

  return (
    <Link to={`/products/${id}`}>
      <div className="rounded-3xl bg-neutral-200 px-8 py-4 shadow-[3px_3px_10px_1px_#00000060] transition-all duration-200 hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[4px_4px_12px_2px_#00000060] hover:brightness-105 dark:bg-neutral-800">
        <h2 className="font-body text-lg">{title}</h2>
        <div className="flex justify-between gap-20 p-3">
          <div className="flex w-32 items-start">
            <span className="py-[.5rem] text-2xl font-bold">{d}</span>
            <span className="text-xl">{c}</span>
          </div>
          <p className="opacity-50">{description}</p>
        </div>
      </div>
    </Link>
  );
}
