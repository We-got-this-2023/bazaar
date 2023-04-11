import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ReactDOM from "react-dom";
import { Link, useParams } from "react-router-dom";
import ProductPreview from "../cards/Product";
import { useAuth } from "../contexts/AuthContext";
import { Product, useMisc } from "../contexts/MiscContext";

export default function ProductsPage() {
  const { user } = useAuth();
  const { isSm } = useMisc();

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
    <div className={`flex flex-col items-center gap-4`}>
      <h1 className={`font-bold ${isSm ? "text-lg" : "text-2xl"}`}>
        {!isLoading && user && "Your "}
        Products
      </h1>
      <div className="flex w-[40rem] max-w-[90%] flex-col items-center gap-4">
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
        {!isLoading && user && (
          <Link
            to="/edit"
            className={`w-fit bg-silk-blue p-2 text-white transition-all duration-200 hover:brightness-95 ${
              isSm ? "rounded-md" : "rounded-lg"
            }`}
          >
            Add a product
          </Link>
        )}
      </div>
    </div>
  );
}
