import { Order } from "./Checkout";

export default function OrderCard({
  order,
}: {
  order: Order & { createdAt: string };
  type?: string;
  amount?: number;
}) {
  const { orderStatus, products, createdAt } = order;
  const time = new Date(createdAt).toLocaleDateString().toString();
  const span =
    "w-fit rounded-md py-1 pr-1 pl-3 text-end font-display text-lg transition-all duration-200 [text-shadow:1px_1px_3px_#00000050] hover:-translate-x-2";
  return (
    <div className="flex h-[10rem] w-[28rem] justify-between rounded-3xl bg-neutral-200 px-12 py-6 shadow-lg transition-all duration-200 dark:bg-neutral-900">
      <div className="flex flex-col justify-between gap-4 font-display">
        <h2 className="text-lg font-bold">
          {(() => {
            const title = products.map(({ name }) => name).join(", ");
            if (title.length > 20) return title.slice(0, 20) + "...";
            return title;
          })()}
        </h2>
        <span className="w-full opacity-50">{time}</span>
        <span className="w-full capitalize opacity-50">{orderStatus}</span>
      </div>
      <div className="flex h-full flex-col items-end justify-between text-white">
        <span className={`${span} cursor-pointer select-none bg-pastel-green`}>
          Track
        </span>
        <span className={`${span} cursor-pointer select-none bg-pastel-blue`}>
          Details
        </span>
        {orderStatus === "pending" && (
          <span className={`${span} cursor-pointer select-none bg-pastel-red`}>
            Edit
          </span>
        )}
      </div>
    </div>
  );
}
