import { Link } from "react-router-dom";
import { useMisc } from "../contexts/MiscContext";

export default function NotFound() {
  const { isSm } = useMisc();
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`
      flex min-h-[28em] w-[36em] min-w-fit max-w-full flex-col items-center justify-center 
      rounded-3xl border-[.5px] border-black bg-neutral-200 
      shadow-[0_0_5px_1px_#00000050] transition-all duration-200 
      hover:shadow-[0_0_8px_2px_#00000070] dark:border-white dark:bg-neutral-900 
      dark:shadow-[0_0_5px_1px_#ffffff80] dark:hover:shadow-[0_0_10px_2px_#ffffff90]
      ${isSm ? "gap-2 p-6" : "gap-4 p-12"}
      `}
      >
        <h1
          className={`font-bold ${
            isSm ? "mt-2 mb-4 text-lg" : "mt-4 mb-8 text-2xl"
          }`}
        >
          404 - Not Found
        </h1>
        <p className={`text-center ${isSm ? "text-sm" : ""}`}>
          The page you are looking for does not exist.
        </p>
        <p className={`text-center ${isSm ? "text-sm" : ""}`}>
          Try going back to the{" "}
          <Link to="/" className="text-sky-500 hover:underline">
            home page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
