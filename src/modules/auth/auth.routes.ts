import { Router } from 'express';
import { authSigninController, authSignupController } from './auth.controllers';
import { validateResource } from '../../shared/http/middleware/validateResource';
import { signInSchema, signUpSchema } from './auth.schemas';

const authRoutes = Router();

authRoutes.post('/signup', validateResource(signUpSchema), authSignupController)
authRoutes.post('/signin', validateResource(signInSchema), authSigninController)


export default authRoutes;