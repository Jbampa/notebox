import express from 'express';
import routes from './shared/http/routes';
import helmet from 'helmet';
import passport from 'passport';
import { strategy } from './shared/utils/passport';
import cors from 'cors';
import { startPurgeDeletedNotesJob } from "./jobs/purgeDeletedNotes.job";

const port = process.env.PORT

const server = express();

server.use(cors());
server.use(passport.initialize());
server.use(helmet());
server.use(express.json());
server.use(express.urlencoded({extended:true}));
server.use(express.static('public'));

passport.use('jwt', strategy);

server.use('/', routes);

startPurgeDeletedNotesJob();

server.listen(port, () => {
    console.log(`Server running at: http://localhost:${port}`)
})