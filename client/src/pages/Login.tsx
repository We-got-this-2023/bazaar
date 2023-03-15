import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "../components/Form";
import Input from "../components/Input";
import { useAuth } from "../contexts/AuthContext";

type FormData = {
  email: string;
  password: string;
};

export default function Login() {
  const { userLoggedIn, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userLoggedIn) navigate("/");
  }, [userLoggedIn]);

  const onSubmit = async (data: FormData) => {
    return await login(data);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="
      flex h-[32em] w-[36em] flex-col items-center justify-center gap-6 
      rounded-3xl border-[.5px] border-black bg-neutral-200 
      p-12 shadow-[0_0_5px_1px_#00000050] transition-all duration-200 
      hover:shadow-[0_0_8px_2px_#00000070] dark:border-white dark:bg-neutral-900 
      dark:shadow-[0_0_5px_1px_#ffffff80] dark:hover:shadow-[0_0_10px_2px_#ffffff90]
      "
      >
        <h1 className="mt-4 mb-8 text-2xl font-bold">Login</h1>
        <Form
          onSubmit={onSubmit}
          className="flex w-4/5 flex-col items-center justify-center gap-4"
        >
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
            placementClassName="w-full"
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
            placementClassName="w-full"
          />
          <Link
            to="/signup"
            className="self-start text-sm text-sky-500 hover:underline"
          >
            Need an account?
          </Link>
          <button
            type="submit"
            className="mt-6 rounded-lg bg-silk-blue px-5 py-3 text-white"
          >
            Login
          </button>
        </Form>
      </div>
    </div>
  );
}
