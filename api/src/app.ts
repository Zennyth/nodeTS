import 'dotenv/config';
import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 3000;

// Cors
const cors = require("cors");
const corsOptions = {
  origin: `http://localhost:8080`
};
app.use(cors(corsOptions));

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db
import init from './db/init.db';
// init();

// view
app.get('/', (req: Request, res: Response) => {
  res.send('Bonjour le monde !!!');
});

// docs
import {initSwagger} from "./swagger";
initSwagger(app, port);

// routes
import routes from "./routes/";
app.use('/api', routes);

// modules
import {initWS} from "./modules/websocket.module";
const server = require('http').createServer(app);
initWS(server);

server.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});