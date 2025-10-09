import React from "react";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/is-logged-in";


export const ProtectedPageGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  if (isLoading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const PublicPageGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  if (isLoading) return null;

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
