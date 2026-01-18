import { RequestHandler } from "express";
import { createFolder, deleteFolder, findFolder, listFolders, updateFolder } from "./folders.service";
import { AppError } from "../../errors/AppError";

export const getFolderController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {folderId} = req.params;
        const folderIdAsNumber = Number(folderId)
        const folder = await findFolder(folderIdAsNumber, userId);
        return res.status(200).json(folder);
    } catch(err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }
        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}

export const getAllFoldersController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const folders = await listFolders(userId);
        return res.status(200).json(folders);
    } catch(err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }
        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}

export const createFolderController: RequestHandler = async (req, res) => {

    try  {
        const {title, emoji} = req.body;

        const user = (req as any).user;

        const folder = await createFolder({
            title, 
            emoji, 
            userId: user.id
        })

        res.status(201).json({
            folder
        })
    } catch(err) {

        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        res.status(500).json({
            err: err
        })
    }

}

export const deleteFolderController: RequestHandler = async (req, res) => {
    try {
        const {id} = req.params;
        const folderId = Number(id);

        if (isNaN(folderId)) {
            return res.status(400).json({ error: "Invalid ID provided" });
        }

        const userId = (req as any).user.id;

        const post = await deleteFolder(folderId, userId);

        return res.status(204).send()
    } catch (err) {

        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        res.status(500).json({
            err: err
        })
    }

}

export const updateFolderController: RequestHandler = async (req, res) => {
    try {

        const {title, emoji} = req.body;
        const {id} = req.params;
        const folderId = Number(id);
        const userId = (req.user as any).id

        if (isNaN(folderId)) {
            return res.status(400).json({ error: "Invalid ID provided" });
        }

        const post =  await updateFolder({
            id: folderId,
            userId: userId,
            title: title,
            emoji: emoji 
        })
        
        return res.status(200).json(post);

    } catch (err) {
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        res.status(500).json({
            err: err
        })
    }

}