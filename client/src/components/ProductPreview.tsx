export default function ProductPreview({ product }: any) {
  const { price, title, images, createdAt, stock, tags, userId, description } =
    product;

  const [first, second]: [string, string] = price.split(".");

  const d = "$" + first;
  let c = second;
  if (second.length === 1) c = `${second}0`;

  return (
    <div className="m-10 rounded-lg bg-neutral-200 px-8 py-4 shadow-[3px_3px_10px_1px_#00000060] dark:bg-neutral-800">
      <h2 className="font-body text-lg">{title}</h2>
      <p className="">{description}</p>
      <div className="flex w-fit items-start py-1 text-black dark:text-white">
        <span className="py-[.5rem] text-xl font-bold">{d}</span>
        <span className="">{c}</span>
      </div>
      <p></p>
    </div>
  );
}
