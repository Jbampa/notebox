import { prisma } from "../../shared/database/prisma";
import { AppError } from "../../errors/AppError";

type createFolderDTO = {
    title: string,
    emoji: string,
    userId: number
}

export const createFolder = async ({title, emoji, userId}: createFolderDTO) => {

    const result = await prisma.folder.create({
        data: {
            title, 
            emoji,
            userId
        }
    })

    return result;
}

export const listFolders = async (userId: number) => {
    const result = await prisma.folder.findMany(
        {
            where: {
                userId: userId
            },
            orderBy: {createdAt: 'desc'}
        }
    )

    return result;
}

export const findFolder = async (id: number, userId: number) => {

    const result = await prisma.folder.findFirst({
        where: {
            id: id, 
            userId: userId,
        }
    })
    
    return result;
}

export const deleteFolder = async (id: number, userId: number) => {
    const folder = await findFolder(id, userId);

    if(!folder) {
        throw new AppError("Folder not found or access denied");
    }

    const result = await prisma.folder.delete({
        where: {
            id: id
        }
    })

    return result;
}

type UpdateFolderDTO = {
    id: number,
    userId: number,
    title?: string, 
    emoji?: string
}

export const updateFolder = async ({id, userId, title, emoji}: UpdateFolderDTO) => {
    const folder = await findFolder(id, userId)

    if(!folder) {
        throw new AppError('Folder not found or access denied');
    }

    const result = await prisma.folder.update({
        where: {
            id: id
        },
        data: {
            title,
            emoji
        }
    })

    return result;
}   

