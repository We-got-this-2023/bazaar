import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { userLoggedIn } = useAuth();
  if (userLoggedIn) return <Navigate to="/" />;
  return <h1>Signup</h1>;
}
