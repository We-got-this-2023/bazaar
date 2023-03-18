import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RestrictedRoutes() {
  const { isAuth } = useAuth();
  return <>{!isAuth() ? <Outlet /> : <Navigate to="/" />}</>;
}

export default RestrictedRoutes;
