import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import InputWithError from "../components/InputWithError";
import { useAuth } from "../context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { userLoggedIn } = useAuth();
  if (userLoggedIn) return <Navigate to="/" />;

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<FormData>();

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <InputWithError errors={errors} name="password">
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
        <InputWithError errors={errors} name="password">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Please enter a password." })}
          />
        </InputWithError>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
