import React from "react";
import { Navigate } from "react-router-dom";
import { useIsLoggedIn } from "../hooks/is-logged-in";

// ✅ Guard لمنع الدخول للصفحات المحمية بدون تسجيل دخول
export const ProtectedPageGuard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isLoggedIn, isLoading } = useIsLoggedIn();

  if (isLoading) return null; // يمكن استبداله بـ Spinner لاحقاً

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// ✅ Guard يمنع المستخدم المسجّل دخوله من الدخول لصفحات login أو signup
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
