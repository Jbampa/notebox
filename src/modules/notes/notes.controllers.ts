import { RequestHandler } from "express";
import { AppError } from "../../errors/AppError";
import { createNote, deleteNote, findNote, getAllNotes, getAllTrashNotes, restoreNote, softDeleteNote, updateNote } from "./notes.service";

export const createNoteController: RequestHandler = async (req, res) => {
    try {
        const {title, body, folderId} = req.body;
        const userId = (req.user as any).id

        const note = await createNote({title, body, userId, folderId})

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
        const {folderId} = req.query;

        const folderIdAsNumber = Number(folderId);

        if (folderId && isNaN(folderIdAsNumber as number)) {
             return res.status(400).json({ err: "Folder ID must be a number" });
        }

        const notes = await getAllNotes(folderIdAsNumber, userId)

        return res.status(200).json(notes);
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        res.status(500).json({
            err: err
        })
    }
}

export const getAllTrashNotesController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {folderId} = req.query;

        const folderIdAsNumber = Number(folderId);

        if (folderId && isNaN(folderIdAsNumber as number)) {
             return res.status(400).json({ err: "Folder ID must be a number" });
        }

        const notes = await getAllTrashNotes(folderIdAsNumber, userId)

        return res.status(200).json(notes);
    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        res.status(500).json({
            err: err,
        })
    }
}



export const getNoteController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {noteId} = req.params;

        const noteIdAsNumber = Number(noteId)

        const note = await findNote(userId, noteIdAsNumber);

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

export const deleteNoteController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {noteId} = req.params;
        const noteIdAsNumber = Number(noteId);

        const note = await deleteNote(userId, noteIdAsNumber);

        return res.status(204).json({});

    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}

export const softDeleteNoteController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {noteId} = req.params;
        const noteIdAsNumber = Number(noteId);

        const note = await softDeleteNote(userId, noteIdAsNumber);

        return res.status(200).json(note);

    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }
}

export const restoreNoteController: RequestHandler = async (req, res) => {
    try {
        const userId = (req.user as any).id;
        const {noteId} = req.params;
        const noteIdAsNumber = Number(noteId);

        const note = await restoreNote(userId, noteIdAsNumber);

        return res.status(200).json(note);

    } catch (err) {
        if(err instanceof AppError) {
            return res.status(err.statusCode).json({
                err: err.message
            })
        }

        return res.status(500).json({
            err: "An internal server error has occurred",
            message: err
        })
    }
}

export const updateNoteController: RequestHandler = async (req, res) => {
    try{
        const userId = (req.user as any).id;
        const {noteId} = req.params;
        const noteIdAsNumber = Number(noteId)
        const {title, body} = req.body;

        const note = await updateNote({userId, noteId: noteIdAsNumber, title, body});

        return res.status(200).json(note);

    } catch(err) {
        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                err: err.message
            })
        }
        return res.status(500).json({
            err: "An internal server error has occurred"
        })
    }

}