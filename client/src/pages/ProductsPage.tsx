import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import ProductPreview from "../cards/Product";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../contexts/MiscContext";

export default function ProductsPage() {
  const { user } = useAuth();
  const {
    data: products,
    isLoading,
    error,
  }: { data: any; isLoading: boolean; error: any } = useQuery(
    ["products"],
    async () => {
      const res = await fetch(
        import.meta.env.VITE_API + "/product/params?userId=" + user.id
      );
      if (res.ok) {
        const data = await res.json();
        return data || {};
      } else {
        console.log(res);
        throw new Error(res.statusText);
      }
    }
  );
  console.log(products);
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
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold">Products</h1>
      <div className="flex w-[40rem] flex-col">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          products?.map((product: Product) => {
            return (
              <ProductPreview
                key={product.id}
                product={product}
                type="products-page"
              />
            );
          })
        )}
      </div>
    </div>
  );
}
