// services/auth.ts
import { api } from "./api";
import type { User } from "../types/user";

type LoginResponse = {
  token: string;
  user: User;
};

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/auth/signin", {
    email,
    password,
  });

  return response.data;
};
