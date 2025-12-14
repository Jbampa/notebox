import { Router } from "express";
import { createFolderController, deleteFolderController } from "./folders.controllers";
import { isAutenticated } from "../../shared/http/middleware/isAutenticated";
import { validateResource } from "../../shared/http/middleware/validateResource";
import { createFolderSchema, deleteFolderSchema } from "./folders.schemas";

const foldersRoutes = Router();

foldersRoutes.post('/', isAutenticated, validateResource(createFolderSchema), createFolderController);
foldersRoutes.delete('/:id', isAutenticated, validateResource(deleteFolderSchema), deleteFolderController);



export default foldersRoutes;