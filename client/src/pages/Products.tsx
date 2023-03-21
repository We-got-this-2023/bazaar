import { useState } from "react";
import Form from "../formElements/Form";
import Input from "../formElements/Input";
import Select from "../formElements/Select";

interface FormDataStruct {
  name: string;
  description: string;
  price: number;
  tags?: string[];
  category?: string;
  images?: File[];
}

const onSubmit = async (data: any) => {
  const formData = new FormData();
  formData.append("file", data.file[0]);
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append("category", data.category);
  formData.append("tags", data.tags);

  const res = await fetch("http://localhost:3000/product", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();

  if (!res.ok) throw Error(json.message);

  return json;
};

export default function Products() {
  const [data, setData] = useState([]);
  return (
    <div className="">
      <h2 className="flex content-center justify-center pt-12 text-6xl">
        Add a product
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
            />
            <Input
              className="h-[120px]"
              name="description"
              type="text"
              placementClassName="w-full"
              options={{}}
            />
            <div className="flex gap-[10px]">
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
              />
              <Input
                className="h-[44px]"
                name="category"
                type="text"
                placementClassName="w-full"
                options={{}}
              />
            </div>
            <Input
              name="tags"
              type="text"
              placementClassName="w-full"
              options={{}}
            />
          </div>

          <button type="submit">Submit</button>
        </Form>
      </div>
    </div>
  );
}
