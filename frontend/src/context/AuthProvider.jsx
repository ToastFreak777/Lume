import { useEffect, useState } from "react";
import { authService } from "../services";
import { AuthContext } from "./store";

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await authService.getCredentials();
        updateCurrentUser(userData);
      } catch (error) {
        setCurrentUser(null);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
  };

    checkAuth();
  }, []);

  const updateCurrentUser = (data) => setCurrentUser(data);

  return (
    <AuthContext.Provider value={{ currentUser, updateCurrentUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
