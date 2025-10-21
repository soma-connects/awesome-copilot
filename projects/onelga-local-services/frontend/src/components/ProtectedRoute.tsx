import { Role } from "../types";
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface ProtectedRouteProps {
  roles?: Role[];
}

const ProtectedRoute = ({ roles }: ProtectedRouteProps) => {
  const { token, user } = useAppSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
