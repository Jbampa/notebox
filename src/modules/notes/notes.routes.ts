import { Router } from "express";
import { createNoteController, getAllNotesController, getNoteController } from "./notes.controllers";
import { isAutenticated } from "../../shared/http/middleware/isAutenticated";
import { validateResource } from "../../shared/http/middleware/validateResource";
import { createNoteSchema } from "./notes.schemas";

const notesRouter = Router();

notesRouter.post('/', isAutenticated, validateResource(createNoteSchema), createNoteController);
notesRouter.get('/:folderId', isAutenticated, getAllNotesController)
notesRouter.get('/:folderId/:noteId', isAutenticated, getNoteController)

export default notesRouter;