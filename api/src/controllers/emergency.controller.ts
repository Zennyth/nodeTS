import {Router, Request, Response} from 'express';

import {getAll, createOrUpdate, getById, } from "../services/emergency.service";
import {CreateEmergencyDTO} from '../db/dto/emergency.dto';

import {emitEvent} from "../modules/websocket.module";

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
    const sensor = await getById(req.params.id);
    res.status(200).send(sensor);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Update or create a Emergency
 * @route POST /api/emergencies/{id}
 * @group Emergencies - Operation about emergencies
 * @param {string} id.query.required
 * @param {string} sensor.body.required
 * @returns {Emergency} 200 - Update or create a Emergency
 * @returns {Error}  default - Unexpected error
 */
router.post('/:id', async (req: Request, res: Response) => {
  try {
    const payload:CreateEmergencyDTO = req.body;
    const result = await createOrUpdate(payload);

    emitEvent("onUpdateEmergency", result);
    console.log(result);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

export default router;