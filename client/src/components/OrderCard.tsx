import { Link } from "react-router-dom";
import { Form } from "./Form";
import { FancyInput as Input } from "./Input";

type Order = {
  id: string;
  title: string;
  time: string;
};

export default function OrderCard({
  order,
}: {
  order: Order;
  type?: string;
  amount?: number;
}) {
  const { id, title, time } = order;
  return (
    <div className="flex h-[10rem] w-[28rem] justify-between rounded-3xl bg-neutral-200 px-12 py-6 shadow-lg dark:bg-neutral-900">
      <div className="flex flex-col gap-4 font-display">
        <h2 className="text-xl font-bold">{title}</h2>
        <span className="w-full opacity-50">{time}</span>
      </div>
      <div className="flex h-full flex-col items-end justify-between text-white">
        <span className="w-fit rounded-md bg-pastel-green py-1 pr-1 pl-3 text-end font-display text-lg transition-all duration-200 [text-shadow:1px_1px_3px_#00000050] hover:-translate-x-2">
          Track
        </span>
        <span className="w-fit rounded-md bg-pastel-blue py-1 pr-1 pl-3 text-end font-display text-lg transition-all duration-200 [text-shadow:1px_1px_3px_#00000050] hover:-translate-x-2">
          Details
        </span>
        {
          <span className="w-fit rounded-md bg-pastel-red py-1 pr-1 pl-3 text-end font-display text-lg transition-all duration-200 [text-shadow:1px_1px_3px_#00000050] hover:-translate-x-2">
            Edit
          </span>
        }
      </div>
    </div>
  );
}
