import ProductPreview from "../cards/Product";
import { useMisc } from "../contexts/MiscContext";

export default function SearchResults({ data, setPage, page }: any) {
  const { isSm } = useMisc();
  return (
    <div
      className={
        "m-10 ml-0 mt-0 flex w-full flex-col gap-2" + (isSm ? "" : " mr-40")
      }
    >
      {(Array.isArray(data) &&
        data.length > 0 &&
        data.map((product: any) => (
          <ProductPreview
            key={product.id}
            product={product}
            type="search-page"
          />
        ))) || (
        <div
          className={`
          relative left-0 right-0 mx-auto flex w-[40rem] max-w-full flex-col items-center justify-center gap-6 
          rounded-3xl border-[.5px] border-black bg-neutral-200 ${
            isSm ? "p-6" : "p-12"
          }
          shadow-[0_0_5px_1px_#00000050] transition-all duration-200 
          hover:shadow-[0_0_8px_2px_#00000070] 
          dark:border-white dark:bg-neutral-900 dark:shadow-[0_0_5px_1px_#ffffff80] 
          dark:hover:shadow-[0_0_10px_2px_#ffffff90]
        `}
        >
          <h1 className="text-xl">
            There are no items matching your search...
          </h1>
        </div>
      )}
      <div className="mb-20 mt-4 flex flex-row items-center justify-center">
        {/* updating page number for pagination */}
        <div className="group relative flex w-fit cursor-pointer items-center justify-center">
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 top-0 m-auto aspect-square w-14 rounded-full bg-black opacity-20 transition-all duration-200 group-hover:opacity-30 dark:bg-white" />
          <button
            onClick={() => setPage((prev: any) => prev - 1)}
            className="aspect-square w-14 font-logo text-3xl"
          >
            -
          </button>
        </div>
        <span className="inline w-14 text-center align-middle font-logo text-3xl">
          {page}
        </span>
        <div className="group relative flex w-fit cursor-pointer items-center justify-center">
          <div className="pointer-events-none absolute left-0 right-0 bottom-0 top-0 m-auto aspect-square w-14 rounded-full bg-black opacity-20 transition-all duration-200 group-hover:opacity-30 dark:bg-white" />
          <button
            onClick={() => setPage((prev: any) => prev + 1)}
            className="aspect-square w-14 font-logo text-3xl"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
