import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { userLoggedIn } = useAuth();
  if (userLoggedIn) return element;
  return <Navigate to="/login" />;
}
