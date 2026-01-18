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

export const findNote = async (userId: number, noteId: number) => {
    const result = await prisma.note.findFirst({
        where: {
            id: noteId,
            folder: {
                userId: userId
            }
        }, include: {
            folder: {
                select: {
                    title: true
                }
            }
        },
    })

    return result;
}

export const getAllNotes = async (folderId: number | undefined, userId: number) => {

    if (folderId) {
        const folder = await findFolder(folderId, userId);
        if(!folder) {
            throw new AppError('Folder not found or access denied', 404);
        }
    }

    const result = await prisma.note.findMany({
        where: {
            deletedAt: null,
            folder: {
                userId: userId
            },

            ...(folderId ? { folderId: folderId } : {})
        },
        include: {
            folder: {
                select: {
                    title: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return result;
}

export const getAllTrashNotes = async (folderId: number | undefined, userId: number) => {

    if (folderId) {
        const folder = await findFolder(folderId, userId);
        if(!folder) {
            throw new AppError('Folder not found or access denied', 404);
        }
    }

    const result = await prisma.note.findMany({
        where: {
            deletedAt: {not: null},
            folder: {
                userId: userId
            },

            ...(folderId ? { folderId: folderId } : {})
        },
        include: {
            folder: {
                select: {
                    title: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return result;
}

export const deleteNote = async (userId: number, noteId: number) => {

    const note = await findNote(userId, noteId);

    if(!note) {
        throw new AppError("Note not found or access denied");
    }

    const result = await prisma.note.delete({
        where: {
            id: noteId
        }
    })

    return result
}

export const softDeleteNote = async (userId: number, noteId: number) => {

    const note = await findNote(userId, noteId);

    if(!note) {
        throw new AppError("Note not found or access denied");
    }

    const result = await prisma.note.update({
        data: {
            deletedAt: new Date()
        },
        where: {
            id: noteId
        }
    })

    return result
}

export const restoreNote = async (userId: number, noteId: number) => {

    const note = await findNote(userId, noteId);

    if(!note) {
        throw new AppError("Note not found or access denied");
    }

    const result = await prisma.note.update({
        data: {
            deletedAt: null
        },
        where: {
            id: noteId
        }
    })

    return result
}

type updateNoteDTO = {
    userId: number,
    noteId: number,
    title?: string,
    body?: string
}

export const updateNote = async ({userId, noteId, title, body}: updateNoteDTO) => {
    const note = findNote(userId, noteId);

    if(!note) {
        throw new AppError("Note not found or access denied");
    }

    const result = await prisma.note.update({
        data: {
            title,
            body
        },
        where: {
            id: noteId,
        }
    })

    return result;
}

