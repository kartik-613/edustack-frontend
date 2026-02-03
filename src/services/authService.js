import API from "./api";

export const loginUser = async (email, password) => {
  const response = await API.post("/auth/login", { email, password });
  return response.data; // should return { token, user }
};

export const registerUser = async (name, email, password) => {
  const response = await API.post("/auth/register", { name, email, password });
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
