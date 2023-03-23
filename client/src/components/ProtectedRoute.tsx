import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <h1>Loading...</h1>;
  if (!user) return <Navigate to="/login" replace />;
  return element;
}
