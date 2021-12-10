import {Router, Request, Response} from 'express';

import {getAll, } from "../services/sensor.service";

const router = Router();
 
router.get('/all', async (request: Request, response: Response) => {
  const sensors = await getAll({});
  response.send(sensors);
});

export default router;