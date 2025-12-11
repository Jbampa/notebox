import express from 'express';
import routes from './shared/http/routes';
import helmet from 'helmet';

const server = express();

server.use(helmet())
server.use(express.json());

server.use('/', routes)

server.listen(3000, () => {
    console.log("servidor rodando!")
})