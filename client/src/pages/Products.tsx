import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../contexts/MiscContext";
import Form from "../formElements/Form";
import Input from "../formElements/Input";
import TextArea from "../formElements/TextArea";

interface FormDataStruct {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  category?: string;
  images?: File[];
}
export default function EditProduct() {
  const { id } = useParams();
  const { user, isLoading: userIsLoading } = useAuth();
  const [product, setProduct] = useState<Product>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (id)
      (async () => {
        const res = await fetch(`${import.meta.env.VITE_API}/product/${id}`);
        const data = await res.json();
        setProduct(data);
      })();
  }, []);

  if (userIsLoading) return null;
  if (isLoading) return null;
  if (!user) return null;

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("file", data.file[0]);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("tags", data.tags);
      formData.append("userId", user.id.toString());

      if (id) {
        const res = await fetch(import.meta.env.VITE_API + "/product/" + id, {
          method: "PATCH",
          body: formData,
        });
        const json = await res.json();

        if (!res.ok) throw new Error(json.message);
        return json;
      } else {
        const res = await fetch(import.meta.env.VITE_API + "/product", {
          method: "POST",
          body: formData,
        });
        const json = await res.json();

        if (!res.ok) throw new Error(json.message);
        navigate("/products");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2 className="flex content-center justify-center pt-12 text-6xl capitalize">
        {id ? "Edit" : "Create"} product
      </h2>
      <div className="flex h-full w-full content-center justify-center pt-6">
        <Form onSubmit={onSubmit} className="flex gap-2">
          <div className="h-full">
            <Input
              id="fileInput"
              name="file"
              type="file"
              placementClassName="w-full"
              className="h-[286px]"
              initialValue={product?.file}
            />
          </div>
          <div className="w-[480px] bg-white">
            <Input
              name="name"
              type="text"
              options={{
                required: "Name is required",
              }}
              placementClassName="w-full"
              initialValue={product?.name}
            />
            <TextArea
              className="h-[120px]"
              name="description"
              placementClassName="w-full"
              options={{}}
              initialValue={product?.description}
            />
            <div className="flex gap-2">
              <Input
                name="price"
                type="number"
                className="h-[44px]"
                options={{
                  required: "Price is required",
                  min: {
                    value: 0,
                    message: "Price must be greater than 0",
                  },
                }}
                placementClassName="w-full"
                initialValue={product?.price}
              />
              <Input
                className="h-[44px]"
                name="categoryName"
                type="text"
                placementClassName="w-full"
                options={{}}
                initialValue={product?.category}
              />
            </div>
            <Input
              name="tags"
              type="text"
              placementClassName="w-full"
              options={{}}
              // initialValue={product?.tags}
              // have to update this when we figure out how to handle multiple tags
            />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </div>
    </div>
  );
}
