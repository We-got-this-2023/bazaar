import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useParams } from "react-router-dom";
import ProductPreview from "../cards/Product";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../contexts/MiscContext";

export default function ProductsPage() {
  const { user } = useAuth();

  const userId = user?.id;
  const {
    data: products,
    isLoading,
    error,
  }: { data: any; isLoading: boolean; error: any } = useQuery(
    ["products"],
    async () => {
      const res = await fetch(
        import.meta.env.VITE_API + "/product/all/params?userId=" + userId
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
      <Link
        to="/edit"
        className="absolute top-24 left-12 rounded-lg bg-silk-blue p-2 text-white transition-all duration-200 hover:brightness-95"
      >
        Add a product
      </Link>
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
