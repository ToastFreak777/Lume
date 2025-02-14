import { createContext, useEffect, useState } from "react";
import { verifyAuth } from "../lib/api";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await verifyAuth();
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
