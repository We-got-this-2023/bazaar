import { useMisc } from "../contexts/MiscContext";

interface Props {
  price: string;
  className?: string;
}

export default function CheckoutSummary({ price, className = "" }: Props) {
  const { cart } = useMisc();
  return (
    <div
      className={`
        m-8 mt-12 flex flex-col items-center justify-center gap-8 
        rounded-xl bg-neutral-200 px-12 py-36 shadow-[0_0_5px_1px_#00000050] 
        transition-all duration-200 hover:shadow-[0_0_8px_2px_#00000070] 
        dark:bg-neutral-900 dark:shadow-[0_0_5px_1px_#ffffff30] 
        dark:hover:shadow-[0_0_6px_2px_#ffffff50] ${className}`}
    >
      <h2 className="text-2xl font-bold">Checkout</h2>
      <div className="flex w-full justify-between p-4">
        <div className="flex flex-col justify-start">
          <h3>Subtotal:</h3>
          <h3>Shipping:</h3>
          <h3>Taxes:</h3>
        </div>
        <div className="flex w-1/4 flex-col justify-end text-lg">
          <p>{price}</p>
          <p>$0.00</p>
          <p>$0.00</p>
        </div>
      </div>
      <hr className="w-full border-black opacity-60 transition-all duration-200 dark:border-white" />
      <div className="flex w-full justify-between p-4">
        <div className="flex flex-col justify-start">
          <h3 className="font-bold">Total:</h3>
        </div>
        <div className="flex w-1/4 flex-col justify-end">
          <p className="font-bold">${price}</p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-center gap-8">
        {/* <PayPalButton /> */}{" "}
        <button className="w-fit rounded-lg p-4 outline outline-1 dark:outline-white">
          Pay Now
        </button>
        <p className="text-center text-base opacity-50">
          At the moment, we only accept payment through PayPal. We apologize for
          any inconvenience.
        </p>
      </div>
    </div>
  );
}
