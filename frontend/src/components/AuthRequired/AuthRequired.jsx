import { useContext } from "react";
import { AuthContext } from "../../context/store";
import { useLocation, useNavigate } from "react-router";
import Loading from "../Loading/Loading";
const AuthRequired = ({ children }) => {
  const { currentUser, isLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  if (isLoading) {
    return <Loading />;
  }

  if (!currentUser) {
    navigate("/login", { state: { from: location }, replace: true });
    return;
  }

  return children;
};

export default AuthRequired;

AuthRequired.prototype = {};
