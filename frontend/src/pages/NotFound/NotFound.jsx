import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../context/store";

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) navigate("/login");

    const from = location.state?.from?.pathname || "/";
    navigate(from);
  });

  return <h1>This page does not exist</h1>;
};

export default NotFound;
