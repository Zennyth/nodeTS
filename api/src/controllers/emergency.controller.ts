import {Router, Request, Response} from 'express';

import {getAll, createOrUpdate, getById, createOrUpdateRange} from "../services/emergency.service";
import {CreateEmergencyDTO} from '../db/dto/emergency.dto';

import {emitEvent} from "../modules/websocket.module";
import { Emergency, Sensor } from '../db/models';
import { getSensors } from '../db/dal/emergency.dal';

const router = Router();

/**
 * List of all emergencies
 * @route GET /api/emergencies 
 * @group Emergencies - Operation about emergencies
 * @returns {Array.<Emergency>} 200 - List of all emergencies
 * @returns {Error}  default - Unexpected error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const emergencies = await getAll({});
    res.status(200).send(emergencies);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Emergency related to the id
 * @route GET /api/emergencies/
 * @group Emergencies - Operation about emergencies
 * @param {string} id.query.required
 * @returns {Emergency} 200 - Emergency related to the id
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const emergency = await getById(req.params.id);
    res.status(200).send(emergency);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Update or create an Emergency
 * @route POST /api/emergencies/
 * @group Emergencies - Operation about emergencies
 * @param {string} sensor.body.required
 * @returns {Array.<Emergency>} 200 - Updated or created Emergencies
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    let result;

    if (Array.isArray(req.body)) {
      const payload:CreateEmergencyDTO[] = req.body;
      result = await createOrUpdateRange(payload);
    } else {
      const payload:CreateEmergencyDTO = req.body;
      result = [await createOrUpdate(payload)];
    }

    if (result.length == 0) {
      throw new Error("Bad request");
    }

    emitEvent("onUpdateEmergencies", result);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Get all sensors from emergency
 * @route GET /api/emergencies/{id}/sensors
 * @group Emergencies - Operation about emergencies
 * @param {string} id.query.required
 * @returns {Emergency} 200 - Get all sensors from emergency
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:id/sensors', async (req: Request, res: Response) => {
  try {
    const sensors = await getSensors(req.params.id);
    res.status(200).send(sensors);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/*
const emergency = await Emergency.findByPk(result.id, {
      include: [Emergency.associations.sensors],
      rejectOnEmpty: true,
    })
    console.log(emergency);
*/

export default router;