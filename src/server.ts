import express from 'express';
import routes from './shared/http/routes';
import helmet from 'helmet';
import passport from 'passport';
import { strategy } from './shared/utils/passport';

const port = process.env.PORT

const server = express();

server.use(passport.initialize());
server.use(helmet())
server.use(express.json());
passport.use('jwt', strategy)

server.use('/', routes)

server.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`)
})