import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AntiProtectedRoute({
  element,
}: {
  element: JSX.Element;
}) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <h1>Loading...</h1>;
  if (user) return <Navigate to="/" replace />;
  return element;
}
