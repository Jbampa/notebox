import { Router } from "express";
import { createNoteController, deleteNoteController, getAllNotesController, getNoteController, updateNoteController } from "./notes.controllers";
import { isAutenticated } from "../../shared/http/middleware/isAutenticated";
import { validateResource } from "../../shared/http/middleware/validateResource";
import { createNoteSchema, deleteNoteSchema, updateNoteSchema } from "./notes.schemas";

const notesRouter = Router();

notesRouter.post('/', isAutenticated, validateResource(createNoteSchema), createNoteController);
notesRouter.get('/', isAutenticated, getAllNotesController);
notesRouter.get('/:noteId', isAutenticated, getNoteController);
notesRouter.patch('/:noteId', isAutenticated, validateResource(updateNoteSchema), updateNoteController);
notesRouter.delete('/:noteId', isAutenticated, validateResource(deleteNoteSchema), deleteNoteController)


export default notesRouter;