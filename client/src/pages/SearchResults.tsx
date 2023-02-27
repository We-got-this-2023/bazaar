import ProductPreview from "../components/ProductPreview";

export default function SearchResults({ data }: any) {
  return (
    <div>
      <h1>Search Results</h1>
      {data.map((product: any) => (
        <ProductPreview key={product.id} product={product} />
      ))}
    </div>
  );
}
