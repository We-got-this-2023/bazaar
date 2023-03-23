import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ProductPreview from "../cards/Product";
import { Product } from "../contexts/MiscContext";

export default function ProductsPage() {
  const {
    data: products,
    isLoading,
    error,
  }: { data: any; isLoading: boolean; error: any } = useQuery(
    ["products"],
    async () => {
      const res = await fetch(import.meta.env.VITE_API + "/products");
      const data = await res.json();
      return data || {};
    }
  );
  const [openProduct, setOpenProduct] = useState({
    id: "",
    title: "",
    price: "",
    description: "",
    images: [],
    createdAt: "",
    tags: [],
    userId: "",
  });

  return (
    <div className="flex flex-col">
      <h1>Products</h1>
      <div className="flex flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          products.map((product: Product) => (
            <ProductPreview
              key={product.id}
              product={product}
              type="products-page"
            />
          ))
        )}
      </div>
    </div>
  );
}
