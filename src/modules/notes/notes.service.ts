import { AppError } from "../../errors/AppError";
import { prisma } from "../../shared/database/prisma";
import { findFolder } from "../folders/folders.service"

type createNoteDTO = {
    title: string,
    body: string,
    userId: number, 
    folderId: number
}

export const createNote = async ({title, body, userId, folderId}: createNoteDTO) => {
    const folder = await findFolder(folderId, userId);

    if (!folder) {
        throw new AppError('Folder not found or access denied', 404)
    }

    const result = await prisma.note.create({
        data: {
            title,
            body,
            folderId
        }
    })

    return result;
}

export const findNote = async (folderId: number, userId: number, noteId: number) => {
    const folder = await findFolder(folderId, userId);

    if(!folder) {
        throw new AppError('Folder not found or access denied');
    }

    const result = prisma.note.findFirst({
        where: {
            id: noteId,
            folderId 
        }
    })

    return result;
}

export const getAllNotes = async (folderId: number, userId: number) => {
    const folder = await findFolder(folderId, userId);

    if(!folder) {
        throw new AppError('Folder not found or access denied')
    }

    const result = prisma.note.findMany({
        where: {
            folderId: folderId
        }
    })

    return result;
}