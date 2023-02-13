import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { Form } from "../components/Form";
import Input from "../components/Input";
import { useAuth } from "../context/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { userLoggedIn, login } = useAuth();
  if (userLoggedIn) return <Navigate to="/" />;

  const onSubmit = async (data: FormData) => {
    return await login(data);
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          options={{
            required: "Please enter your email.",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Please enter a valid email.",
            },
          }}
        />
        <Input
          name="password"
          type="password"
          options={{
            required: "Please enter a password.",
            validate(password) {
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
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
