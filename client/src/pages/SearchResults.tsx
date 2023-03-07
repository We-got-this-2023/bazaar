import ProductPreview from "../components/ProductPreview";

export default function SearchResults({ data }: any) {
  return (
    <div className="m-10 ml-0 mt-0 flex flex-col gap-2">
      {Array.isArray(data) &&
        data.map((product: any) => (
          <ProductPreview key={product.id} product={product} />
        ))}
    </div>
  );
}
