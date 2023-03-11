import { useFormContext } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Form } from "./Form";
import { FancyInput as Input } from "./Input";

type FormData = {
  country: string;
  city: string;
  region: string;
  address: string;
  address2: string;
  postalCode: string;
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  countryCallingCode: string;
  phoneNumber: string;
};

export default function DeliveryForm({ user }: { user: any }) {
  const onSubmit = async (data: FormData) => {
    console.log(data);
    // TODO: Send data to server
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border-[.5px] border-black bg-neutral-200 p-12 shadow-[0_0_5px_1px_#00000050] transition-all duration-200 hover:shadow-[0_0_8px_2px_#00000070] dark:border-white dark:bg-neutral-900 dark:shadow-[0_0_5px_1px_#ffffff80] dark:hover:shadow-[0_0_10px_2px_#ffffff90]">
      <h2 className="text-2xl font-bold">Delivery Form</h2>
      <Form
        onSubmit={onSubmit}
        className="grid w-[34em] grid-cols-6 grid-rows-[8] gap-1"
      >
        <Input
          type="text"
          name="country"
          options={{
            required: "Please enter a country.",
          }}
          placementClassName="col-span-2"
        />

        <Input
          type="text"
          name="city"
          options={{
            required: "Please enter a city.",
          }}
          placementClassName="col-span-2 row-start-2"
        />

        <Input
          type="text"
          name="region"
          options={{
            required: "Please enter a region.",
          }}
          placementClassName="col-span-2 row-start-2 col-start-3"
        />

        <Input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          options={{
            required: "Please enter a postal code.",
          }}
          placementClassName="col-span-2 row-start-2 col-start-5"
        />

        <Input
          type="text"
          name="address"
          options={{
            required: "Please enter an address.",
          }}
          placementClassName="row-start-3 col-span-3"
        />

        <Input
          type="text"
          name="Address 2"
          placementClassName="row-start-3 col-start-4 col-span-3"
        />

        <Input
          type="text"
          name="firstName"
          placeholder="First Name"
          options={{
            required: "Please enter a first name.",
          }}
          placementClassName="row-start-4 col-span-3"
        />

        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          options={{
            required: "Please enter a last name.",
          }}
          placementClassName="row-start-4 col-start-4 col-span-3"
        />

        <Input
          type="text"
          name="email"
          options={{
            required: "Please enter an email address.",
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: "Please enter a valid email address.",
            },
          }}
          placementClassName="row-start-5 col-span-3"
        />

        <Input
          type="text"
          name="confirmEmail"
          placeholder="Confirm Email"
          options={{
            required: "Please confirm your email address.",
            validate: (confirmEmail) =>
              confirmEmail === useFormContext().getValues().email ||
              "Email addresses do not match.",
          }}
          placementClassName="row-start-5 col-start-4 col-span-3"
        />

        <Input
          type="text"
          name="countryCallingCode"
          placeholder="Country Code"
          options={{
            required: "Please enter a country calling code.",
          }}
          initialValue={"+1"}
          placementClassName="row-start-6 col-start-1 col-span-1"
        />

        <Input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          options={{
            required: "Please enter a phone number.",
          }}
          placementClassName="row-start-6 col-start-2 col-span-5"
        />

        <button
          className="col-span-2 col-start-3 row-start-[8] rounded-xl bg-emerald-600 p-3 text-white transition-all duration-200 hover:bg-emerald-400 hover:text-black hover:shadow-[0_0_5px_1px_#00000050] dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-600 dark:hover:text-white dark:hover:shadow-[0_0_5px_1px_#ffffff50]"
          type="submit"
        >
          Submit
        </button>
      </Form>
    </div>
  );
}
