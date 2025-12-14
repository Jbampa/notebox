import { Router } from 'express';
import authRoutes from '../../modules/auth/auth.routes';
import foldersRoutes from '../../modules/folders/folders.routes';

const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/folders', foldersRoutes);

routes.get('/', (req, res) => {
    res.json({
        message: "O sistema está rodando!"
    })
})

export default routes;