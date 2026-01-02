import { api } from "./api";
import type { Folder } from "../types/folder";

export const getFolders = async ():Promise<Folder[]> => {
  const response = await api.get("/folders");
  return response.data;
}