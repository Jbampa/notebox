// services/auth.ts
import { api } from "./api";
import type { User } from "../types/user";

type LoginResponse = {
  token: string;
  user: User;
};

type SignUpResponse = {
  email: string;
  user: string;
}

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

export const signUp = async (
  name: string,
  email: string,
  password: string
): Promise<SignUpResponse> => {
  const response = await api.post("auth/signup", {
    name,
    email,
    password
  })

  return response.data;
}
