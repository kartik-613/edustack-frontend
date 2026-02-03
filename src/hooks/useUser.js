import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const useUser = () => {
  const { user, updateUser } = useContext(UserContext);
  return { user, updateUser };
};

export default useUser;
