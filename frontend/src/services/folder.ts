import { api } from "./api";
import type { Folder } from "../types/folder";

export const getFolders = async ():Promise<Folder[]> => {
  const response = await api.get("/folders");
  return response.data;
}

export const deleteFolder = async (id: number) => {
  const result = await api.delete(`/folders/${id}`);

  return result.data
}

export const updateFolder = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}): Promise<Folder> => {
  const result = await api.patch(`/folders/${id}`, { title });
  return result.data;
};

export const createFolder = async (title: string): Promise<Folder> => {
  const result = await api.post('/folders', {title});
  return result.data;
}