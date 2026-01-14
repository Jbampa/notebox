import type { Note } from "../types/notes";
import { api } from "./api";

export const getAllNotes = async (folderId: number | null):Promise<Note[]> => {
    const url =
    folderId === null
      ? "/notes"
      : `/notes?folderId=${folderId}`;

      const response = await api.get(url);

    return response.data;
}

export const getNote = async (id: number | null):Promise<Note> => {
  const response = await api.get(`/notes/${id}`);
  return response.data;
}

export const updateNote = async (
  id: number,
  data: {
    title?: string;
    body?: string;
  }
): Promise<Note> => {


  const response = await api.patch<Note>(`/notes/${id}`, data);
  return response.data;
};

export const deleteNote = async (id: number) => {
    const response = await api.delete(`/notes/${id}`);
    return response.data;
}

export const createNote = async ({
  folderId,
  title,
}: {
  folderId: number;
  title: string;
}): Promise<Note> => {
  const result = await api.post(`/notes`, { title, folderId });
  return result.data;
};
