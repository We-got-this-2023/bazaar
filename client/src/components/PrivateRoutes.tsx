import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoutes() {
  const { isAuth } = useAuth();
  return <>{isAuth() ? <Outlet /> : <Navigate to="/" />}</>;
}

export default PrivateRoutes;
