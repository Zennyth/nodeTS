import {Router, Request, Response} from 'express';

import {getAll, createOrUpdate, getById, createOrUpdateRange, } from "../services/sensor.service";
import {CreateSensorDTO} from '../db/dto/sensor.dto';

import {emitEvent} from "../modules/websocket.module";
import { Emergency, Sensor } from '../db/models';

const router = Router();

/**
 * List of all sensors
 * @route GET /api/sensors 
 * @group Sensors - Operation about sensors
 * @returns {Array.<Sensor>} 200 - List of all sensors
 * @returns {Error}  default - Unexpected error
 */
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

/**
 * Sensor related to the id
 * @route GET /api/sensors/
 * @group Sensors - Operation about sensors
 * @param {string} id.query.required
 * @returns {Sensor} 200 - Sensor related to the id
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const sensor = await getById(req.params.id);
    res.status(200).send(sensor);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Update or create a Sensor
 * @route POST /api/sensors/
 * @group Sensors - Operation about sensors
 * @param {string} sensor.body.required
 * @returns {Sensor} 200 - Update or create a Sensor
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    let result;

    if (Array.isArray(req.body)) {
      const payload:CreateSensorDTO[] = req.body;
      result = await createOrUpdateRange(payload);
    } else {
      const payload:CreateSensorDTO = req.body;
      result = [await createOrUpdate(payload)];
    }

    emitEvent("onUpdateSensor", result);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

export default router;