import { Router } from "express";
import { isAutenticated } from "../../shared/http/middleware/isAutenticated";
import { validateMultipartResource, validateResource } from "../../shared/http/middleware/validate";
import { updateUserSchema } from "./user.schemas";
import { updateUserController } from "./user.controllers";
import { upload } from "../../shared/upload/multer";


const userRoutes = Router();

userRoutes.post('/', isAutenticated, upload.single('avatar'), validateMultipartResource(updateUserSchema), updateUserController);


export default userRoutes;