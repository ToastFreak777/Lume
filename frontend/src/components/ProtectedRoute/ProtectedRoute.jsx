import { useContext } from "react";
import { AuthContext } from "../../context/store";
import { Navigate, useLocation } from "react-router";
import Loading from "../Loading/Loading";
const ProtectedRoute = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;

ProtectedRoute.prototype = {};
