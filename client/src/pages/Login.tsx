import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
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
        <InputDiv>
          <ErrorMessage errors={errors} name="email" />
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
        </InputDiv>
        <InputDiv>
          <ErrorMessage errors={errors} name="password" />
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Please enter a password." })}
          />
        </InputDiv>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function InputDiv({ children }: { children: [JSX.Element, JSX.Element] }) {
  const error = children.filter((child) => child.type === ErrorMessage)[0];
  const input = children.filter((child) => child.type !== ErrorMessage)[0];

  return (
    <div className="flex flex-col gap-2">
      {input}
      {error.props.errors[error.props.name] && (
        <div className="flex items-center text-red-500">{error}</div>
      )}
    </div>
  );
}
