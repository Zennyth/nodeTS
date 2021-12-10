import 'dotenv/config';
import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = process.env.PORT || 3000;

// Body parsing Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db
import db from './db/init.db';
db()

// Controllers
import sensorController from "./controllers/sensor.controller";
app.use('/sensors', sensorController);

app.get('/', (req: Request, res: Response) => {
  res.send('Bonjour le monde !!!');
});

app.listen(port, () => {
  return console.log(`server is listening on http://localhost:${port}`);
});