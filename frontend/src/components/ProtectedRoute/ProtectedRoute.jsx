import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {}

  return <div>ProtectedRoute</div>;
};

export default ProtectedRoute;
