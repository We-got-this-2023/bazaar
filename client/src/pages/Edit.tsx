import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../contexts/MiscContext";
import Form from "../formElements/Form";
import Input from "../formElements/Input";
import TextArea from "../formElements/TextArea";

interface FormDataStruct {
  name: string;
  description: string;
  price: number;
  tags?: string;
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
    (async () => {
      if (id) {
        const res = await fetch(`${import.meta.env.VITE_API}/product/${id}`);
        const data = await res.json();
        setProduct(data);
      }
      setIsLoading(false);
    })();
  }, []);

  if (userIsLoading) return null;
  if (isLoading) return null;
  if (!user) return null;

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      if (data.file[0]) formData.append("file", data.file[0]);
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      if (data.category) formData.append("category", data.category);
      if (data.tags) formData.append("tags", data.tags);
      formData.append("userId", user.id?.toString());

      console.log(formData);

      if (id) {
        const res = await fetch(import.meta.env.VITE_API + "/product/" + id, {
          method: "PATCH",
          body: formData,
          headers: {
            Authorization:
              "Bearer " +
              document.cookie
                .split(";")
                .filter((item) => item.startsWith("token="))[0]
                .split("=")[1],
          },
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        navigate("/products");
        return json;
      } else {
        const res = await fetch(import.meta.env.VITE_API + "/product", {
          method: "POST",
          body: formData,
          headers: {
            Authorization:
              "Bearer " +
              document.cookie
                .split(";")
                .filter((item) => item.startsWith("token="))[0]
                .split("=")[1],
          },
        });
        if (!res.ok) throw new Error(res.statusText);
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
      <div className="mt-[60px] flex content-center items-center justify-center">
        <div className="flex w-[660px] items-center justify-center gap-6 rounded-md border-[.5px] border-black bg-neutral-200 p-4">
          <Form onSubmit={onSubmit} className="flex gap-2">
            <div className="h-[292px] w-[120px] ">
              <Input
                id="fileInput"
                name="file"
                type="file"
                placementClassName="w-full"
                className="w- h-[292px]"
                initialValue={product?.file}
              />
            </div>
            <div className="w-[480px]">
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
                  initialValue={product?.price?.toString()}
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
                initialValue={product?.tags}
              />
            </div>

            <button
              className=" absolute left-[48%] bottom-[220px] w-[100px] rounded-md border-[.5px] border-black bg-neutral-200 p-2
               hover:shadow-[0_0_8px_2px_#00000070] dark:border-white dark:bg-neutral-900 dark:shadow-[-1_0_5px_1px_#ffffff80]
               dark:hover:shadow-[0_0_10px_2px_#ffffff90]"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
