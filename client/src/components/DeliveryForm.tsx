import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import InputWithError from "./InputWithError";

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

export default function Signup() {
  const { userLoggedIn } = useAuth();
  if (userLoggedIn) return <Navigate to="/" />;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isLoading },
  } = useForm<FormData>();

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <InputWithError errors={errors} name="country">
        <input
          type="text"
          placeholder="Country"
          {...register("country", {
            required: "Please enter a country.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="city">
        <input
          type="text"
          placeholder="City"
          {...register("city", {
            required: "Please enter a city.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="region">
        <input
          type="text"
          placeholder="Region"
          {...register("region", {
            required: "Please enter a region.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="address">
        <input
          type="text"
          placeholder="Address"
          {...register("address", {
            required: "Please enter an address.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="address2">
        <input type="text" placeholder="Address 2" {...register("address2")} />
      </InputWithError>
      <InputWithError errors={errors} name="postalCode">
        <input
          type="text"
          placeholder="Postal Code"
          {...register("postalCode", {
            required: "Please enter a postal code.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="firstName">
        <input
          type="text"
          placeholder="First Name"
          {...register("firstName", {
            required: "Please enter a first name.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="lastName">
        <input
          type="text"
          placeholder="Last Name"
          {...register("lastName", {
            required: "Please enter a last name.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="email">
        <input
          type="text"
          placeholder="Email"
          {...register("email", {
            required: "Please enter an email address.",
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: "Please enter a valid email address.",
            },
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="confirmEmail">
        <input
          type="text"
          placeholder="Confirm Email"
          {...register("confirmEmail", {
            required: "Please confirm your email address.",
            validate: (value) =>
              value === getValues("email") || "Email addresses do not match.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="countryCallingCode">
        <input
          type="text"
          placeholder="Country Calling Code"
          {...register("countryCallingCode", {
            required: "Please enter a country calling code.",
          })}
        />
      </InputWithError>
      <InputWithError errors={errors} name="phoneNumber">
        <input
          type="text"
          placeholder="Phone Number"
          {...register("phoneNumber", {
            required: "Please enter a phone number.",
          })}
        />
      </InputWithError>
      <button type="submit">Submit</button>
    </form>
  );
}
