import ProductPreview from "../cards/Product";

export default function SearchResults({ data }: any) {
  return (
    <div className="m-10 ml-0 mt-0 flex w-full flex-col gap-2">
      {Array.isArray(data) &&
        data.map((product: any) => (
          <ProductPreview key={product.id} product={product} />
        ))}
    </div>
  );
}
