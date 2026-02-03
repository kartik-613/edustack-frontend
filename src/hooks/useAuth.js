import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { isAuthenticated, login, logout, loading } = useContext(AuthContext);
  return { isAuthenticated, login, logout, loading };
};

export default useAuth;
