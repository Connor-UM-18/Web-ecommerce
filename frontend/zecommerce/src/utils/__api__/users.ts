import axios from "@lib/axios";
import User from "models/user.model";
// CUSTOM DATA MODEL
import { IDParams } from "interfaces";
const API_URL = process.env.NEXT_PUBLIC_API_BACK;

export const createUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/usuarios`, data);
  return response.data;
};

export const loginUser = async (data: any) => {
  const response = await axios.post(`${API_URL}/login-usuario`, data);
  return response.data;
}

export const getInformationUser = async (data: any) => {
  const response = await axios.get(`${API_URL}/usuarios/${data}`);
  return response.data[0];
}


export const getUser = async (): Promise<User> => {
  const response = await axios.get("/api/user-list/1");
  return response.data;
};

export const getUserIds = async (): Promise<IDParams[]> => {
  const response = await axios.get("/api/user-list/id-list");
  return response.data;
};

export default { getUser, getUserIds , createUser, loginUser, getInformationUser};
