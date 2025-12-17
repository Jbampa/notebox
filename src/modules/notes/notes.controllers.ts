import { RequestHandler } from "express";
import { AppError } from "../../errors/AppError";
import { createNote, findNote, getAllNotes } from "./notes.service";

export const createNoteController: RequestHandler = (req, res) => {
    try {
        const {title, body, folderId} = req.body;
        const userId = (req.user as any).id

        const note = createNote({title, body, userId, folderId})

        return res.status(201).json(note)

    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        return res.status(500).json({
            err: "An internal server err has occurred"
        })
    }
}

export const getAllNotesController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {folderId} = req.params;

        const folderIdAsNumber = Number(folderId)

        const notes = await getAllNotes(folderIdAsNumber, userId)

        return res.status(200).json(notes);
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        res.status(500).json({
            err: "An internal server error occurred"
        })
    }
}

export const getNoteController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {folderId, noteId} = req.params;

        const noteIdAsNumber = Number(noteId);
        const folderIdAsNumber = Number(folderId);

        console.log(noteIdAsNumber);
        console.log(folderIdAsNumber);
        console.log(userId)

        const note = await findNote(folderIdAsNumber, userId, noteIdAsNumber);

        console.log(note)

        return res.status(200).json(note);
    } catch(err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        return res.status(500).json({
            err: "An internal server error occurred"
        })
    }
} 