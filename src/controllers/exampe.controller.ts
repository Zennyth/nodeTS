import * as express from 'express';

import loggerMiddleware from "../middlewares/logger.middleware";

const router = express.Router();

router.use(loggerMiddleware);
 
router.get('/', (request, response) => {
  response.send('Hello world!');
});

export default router;