import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="
      flex min-h-[28em] min-w-[36em] flex-col items-center justify-center gap-12 
      rounded-3xl border-[.5px] border-black bg-neutral-200 
      p-12 shadow-[0_0_5px_1px_#00000050] transition-all duration-200 
      hover:shadow-[0_0_8px_2px_#00000070] dark:border-white dark:bg-neutral-900 
      dark:shadow-[0_0_5px_1px_#ffffff80] dark:hover:shadow-[0_0_10px_2px_#ffffff90]
      "
      >
        <h1 className="mt-4 mb-8 text-2xl font-bold">404 - Not Found</h1>
        <p className="text-center">
          The page you are looking for does not exist.
        </p>
        <p className="text-center">
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
