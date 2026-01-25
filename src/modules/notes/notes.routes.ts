import { Router } from "express";
import { createNoteController, deleteNoteController, getAllNotesController, getAllTrashNotesController, getNoteController, restoreNoteController, softDeleteNoteController, updateNoteController } from "./notes.controllers";
import { isAutenticated } from "../../shared/http/middleware/isAutenticated";
import { validateResource } from "../../shared/http/middleware/validate";
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "./notes.schemas";

const notesRouter = Router();

notesRouter.post('/', isAutenticated, validateResource(createNoteSchema), createNoteController);
notesRouter.get('/', isAutenticated, getAllNotesController);
notesRouter.get('/trash', isAutenticated, getAllTrashNotesController);
notesRouter.get('/:noteId', isAutenticated, getNoteController);
notesRouter.patch('/:noteId', isAutenticated, validateResource(updateNoteSchema), updateNoteController);
notesRouter.delete('/:noteId', isAutenticated, validateResource(deleteNoteSchema), deleteNoteController);
notesRouter.patch('/:noteId/trash', isAutenticated, validateResource(deleteNoteSchema), softDeleteNoteController);
notesRouter.patch('/:noteId/restore', isAutenticated, validateResource(deleteNoteSchema), restoreNoteController);


export default notesRouter;