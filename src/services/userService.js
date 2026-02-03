import API from "./api";

export const fetchUser = async () => {
  const response = await API.get("/user/me");
  return response.data;
};
