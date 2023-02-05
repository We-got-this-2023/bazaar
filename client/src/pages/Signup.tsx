import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import InputWithError from "../components/InputWithError";
import { useAuth } from "../context/AuthContext";

type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
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
        <InputWithError errors={errors} name="username">
          <input
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Please enter a username.",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters long.",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters long.",
              },
            })}
          />
        </InputWithError>
        <InputWithError errors={errors} name="password">
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Please enter a password.",
              validate() {
                const { password } = getValues();
                if (
                  password.match(/[a-z]/) &&
                  password.match(/[A-Z]/) &&
                  password.match(/[0-9]/) &&
                  password.match(/[~`!@#$%^&*()\-_+=[\]{};':"\\|,.<>/?]/)
                )
                  return true;
                return "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.";
              },
            })}
          />
        </InputWithError>
        <InputWithError errors={errors} name="confirmPassword">
          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: "Please confirm your password.",
              validate: {
                matchesPreviousPassword: (value) => {
                  const { password } = getValues();
                  return password === value || "Passwords don't match!";
                },
              },
            })}
          />
        </InputWithError>
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
