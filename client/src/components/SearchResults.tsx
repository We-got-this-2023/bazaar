import ProductPreview from "../cards/Product";
import { useMisc } from "../contexts/MiscContext";

export default function SearchResults({ data }: any) {
  const { isSm } = useMisc();
  return (
    <div
      className={
        "m-10 ml-0 mt-0 flex w-full flex-col gap-2" + (isSm ? "" : " mr-40")
      }
    >
      {Array.isArray(data) &&
        data.map((product: any) => (
          <ProductPreview
            key={product.id}
            product={product}
            type="search-page"
          />
        ))}
    </div>
  );
}
