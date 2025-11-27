import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const rawUser = localStorage.getItem("user");

  // If still loading or not set yet, avoid redirect flicker
  if (!rawUser) {
    return <Navigate to="/" replace />;
  }

  const user = JSON.parse(rawUser);

  // Validate role
  if (role && user.role.toUpperCase() !== role.toUpperCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
}
