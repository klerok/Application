import { useContext, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import { login, logout } from "../api/auth";
import { AuthContext } from "../contexts/authContext";

export const useAuth = () => {
  const { token, setToken } = useContext(AuthContext);
  const { getItem, setItem, removeItem } = useLocalStorage();

  useEffect(() => {
    const savedToken = getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, [getItem, setToken]);

  const loginUser = async (email, password) => {
    const data = await login(email, password);
    const newToken = data.token;
    setToken(newToken);
    setItem("token", newToken);
  };

  const logoutUser = async () => {
    if (token) {
      try {
        await logout(token);
      } catch (error) {
        console.error("Failed to logout", error);
      }
    }
    setToken(null);
    removeItem("token");
  };

  return { token, loginUser, logoutUser, isAuthenticated: !!token };
};
