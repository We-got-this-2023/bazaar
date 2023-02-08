import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import FancyInput from "../components/FancyInput";
import { useAuth } from "../context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { userLoggedIn, login } = useAuth();
  if (userLoggedIn) return <Navigate to="/" />;

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit((data) => {
      const { email, password } = data;
      login({ email, password });
    });
  }

  <input type="text" />;
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <FancyInput
          errors={errors}
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

        <FancyInput
          errors={errors}
          type="password"
          placeholder="Password"
          {...register("password", { required: "Please enter a password." })}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
