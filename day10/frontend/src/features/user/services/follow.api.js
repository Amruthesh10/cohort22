import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true
});

export const followUser = async (username) => {
  const response = await API.post("/follow/" + username);
  return response.data;
};

export const unfollowUser = async (username) => {
  const response = await API.delete(`/unfollow/${username}`);
  return response.data;
};