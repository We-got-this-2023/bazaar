export default function ProductPreview({ product }: any) {
  console.log(product);
  return (
    <div>
      <h1>Product Preview</h1>
      <h2>{product.title}</h2>
    </div>
  );
}
