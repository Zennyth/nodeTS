import 'dotenv/config';
import express from 'express';

const app = express();
const port = 3000;

// Controllers
import exampleController from "./controllers/exampe.controller";
app.use('/example', exampleController);

app.get('/', (req, res) => {
  res.send('Bonjour le monde !!!');
});

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});