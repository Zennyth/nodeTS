import {Router, Request, Response} from 'express';

import {getAll, createOrUpdate, } from "../services/sensor.service";
import {CreateSensorDTO} from '../db/dto/sensor.dto';

const router = Router();
 
router.get('/', async (req: Request, res: Response) => {
  try {
    const sensors = await getAll({});
    res.status(200).send(sensors);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const payload:CreateSensorDTO = req.body;
    const result = await createOrUpdate(payload);
    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

export default router;