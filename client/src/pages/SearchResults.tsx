import ProductPreview from "../components/ProductPreview";

export default function SearchResults({ data }: any) {
  return (
    <div>
      {Array.isArray(data) &&
        data.map((product: any) => (
          <ProductPreview key={product.id} product={product} />
        ))}
    </div>
  );
}
