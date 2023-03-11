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

export default function DeliveryForm() {
  const { userLoggedIn } = useAuth();
  if (userLoggedIn) return <Navigate to="/" />;

  const onSubmit = async (data: FormData) => {
    console.log(data);
    // TODO: Send data to server
  };

  return (
    <Form onSubmit={onSubmit}>
      <Input
        type="text"
        name="country"
        options={{
          required: "Please enter a country.",
        }}
      />

      <Input
        type="text"
        name="city"
        options={{
          required: "Please enter a city.",
        }}
      />

      <Input
        type="text"
        name="region"
        options={{
          required: "Please enter a region.",
        }}
      />

      <Input
        type="text"
        name="address"
        options={{
          required: "Please enter an address.",
        }}
      />

      <Input type="text" name="Address 2" />

      <Input
        type="text"
        name="postalCode"
        placeholder="Postal Code"
        options={{
          required: "Please enter a postal code.",
        }}
      />

      <Input
        type="text"
        name="firstName"
        placeholder="First Name"
        options={{
          required: "Please enter a first name.",
        }}
      />

      <Input
        type="text"
        name="lastName"
        placeholder="Last Name"
        options={{
          required: "Please enter a last name.",
        }}
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
      />

      <Input
        type="text"
        name="countryCallingCode"
        placeholder="Country Calling Code"
        options={{
          required: "Please enter a country calling code.",
        }}
      />

      <Input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        options={{
          required: "Please enter a phone number.",
        }}
      />

      <button type="submit">Submit</button>
    </Form>
  );
}
