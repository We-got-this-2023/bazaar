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
    console.log(data);
    await login(data);
    console.log("logged in");
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          options={{ required: "Please enter your email." }}
        />
        <Input
          name="password"
          type="password"
          options={{ required: "Please enter your password." }}
        />
        <button type="submit">Login</button>
      </Form>
    </div>
  );
}
