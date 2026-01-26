import type { User } from "../types/user";
import { api } from "./api"


export const updateUser = async ({ name, currentPassword, password, avatar }: { 
  name?: string; 
  currentPassword?: string; 
  password?: string; 
  avatar?: File | null; 
}): Promise<User> => {
  
  const formData = new FormData();

  if (name) formData.append("name", name);
  if (currentPassword) formData.append("currentPassword", currentPassword);
  if (password) formData.append("password", password);
  
  if (avatar) {
    formData.append("avatar", avatar);
  }

  const response = await api.patch('/user', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};