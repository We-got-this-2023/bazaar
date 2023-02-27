import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ element }: { element: JSX.Element }) {
  const { userLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    console.log(userLoggedIn);
    console.log(isLoading);
  }, [userLoggedIn, isLoading]);

  if (isLoading) return <div>Loading...</div>;
  if (userLoggedIn) return element;
  return <Navigate to="/login" />;
}
