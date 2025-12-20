import { Router } from 'express';
import { authSigninController, authSignupController, authValidateController } from './auth.controllers';
import { validateResource } from '../../shared/http/middleware/validateResource';
import { signInSchema, signUpSchema } from './auth.schemas';
import { isAutenticated } from '../../shared/http/middleware/isAutenticated';

const authRoutes = Router();

authRoutes.post('/signup', validateResource(signUpSchema), authSignupController);
authRoutes.post('/signin', validateResource(signInSchema), authSigninController);
authRoutes.get('/validate', isAutenticated, authValidateController);


export default authRoutes;