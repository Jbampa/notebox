import { Router } from 'express';
import authRoutes from '../../modules/auth/auth.routes';

const routes = Router();

routes.use('/auth', authRoutes)

routes.get('/', (req, res) => {
    res.json({
        message: "O sistema está rodando!"
    })
})

export default routes;