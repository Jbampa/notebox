import { Router } from "express";
import { createFolderController, deleteFolderController, updateFolderController } from "./folders.controllers";
import { isAutenticated } from "../../shared/http/middleware/isAutenticated";
import { validateResource } from "../../shared/http/middleware/validateResource";
import { createFolderSchema, deleteFolderSchema, updateFolderSchema } from "./folders.schemas";

const foldersRoutes = Router();

foldersRoutes.post('/', isAutenticated, validateResource(createFolderSchema), createFolderController);
foldersRoutes.delete('/:id', isAutenticated, validateResource(deleteFolderSchema), deleteFolderController);
foldersRoutes.patch('/:id', isAutenticated, validateResource(updateFolderSchema), updateFolderController);


export default foldersRoutes;