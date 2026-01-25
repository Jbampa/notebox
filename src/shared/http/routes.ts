import { Router } from 'express';
import authRoutes from '../../modules/auth/auth.routes';
import foldersRoutes from '../../modules/folders/folders.routes';
import notesRouter from '../../modules/notes/notes.routes';
import { trackerRoutes } from '../../modules/trackers/trackers.routes';
import userRoutes from '../../modules/users/user.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/folders', foldersRoutes);
routes.use('/notes', notesRouter);
routes.use('/trackers', trackerRoutes);
routes.use('/user', userRoutes)

routes.get('/', (req, res) => {
    res.json({
        message: "O sistema está rodando!"
    })
})

export default routes;