import { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../context/store/AuthContext";
import { authService } from "../services";

const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // await logoutUser();
      await authService.logout();
      context.updateCurrentUser(null);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ...context,
    handleLogout,
  };
};

export default useAuth;
