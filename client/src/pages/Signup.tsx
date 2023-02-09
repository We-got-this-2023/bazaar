import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFormContext } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Form } from "../components/Form";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

type FormData = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export default function Signup() {
  const { userLoggedIn, signup } = useAuth();
  if (userLoggedIn) return <Navigate to="/" />;

  const onSubmit = async (data: FormData) => {
    console.log(data);
    await signup(data);
    console.log("signed up");
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          options={{
            required: "Please enter an email address.",
            pattern: {
              value: /^\S+@\S+\.\S+$/i,
              message: "Please enter a valid email address.",
            },
          }}
        />
        <Input
          name="username"
          type="text"
          options={{
            required: "Please enter a username.",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters long.",
            },
            maxLength: {
              value: 20,
              message: "Username must be at most 20 characters long.",
            },
          }}
        />
        <Input
          name="password"
          type="text"
          options={{
            required: "Please enter a password.",
            validate() {
              const { getValues } = useFormContext();
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
          }}
        />
        <Input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          options={{
            required: "Please confirm your password.",
            validate(value) {
              const { getValues } = useFormContext();
              if (value === getValues().password) return true;
              return "Passwords do not match.";
            },
          }}
        />

        <button type="submit">Sign up</button>
      </Form>
    </div>
  );
}
