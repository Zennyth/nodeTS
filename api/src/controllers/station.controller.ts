import {Router, Request, Response} from 'express';

import {getAll, createOrUpdate, getById, createOrUpdateRange, getTeams, } from "../services/station.service";
import {CreateStationDTO} from '../db/dto/station.dto';

import {emitEvent} from "../modules/websocket.module";
import { Emergency, Station } from '../db/models';

const router = Router();

/**
 * List of all stations
 * @route GET /api/stations 
 * @group Stations - Operation about stations
 * @returns {Array.<Station>} 200 - List of all stations
 * @returns {Error}  default - Unexpected error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const stations = await getAll({});
    res.status(200).send(stations);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Station related to the id
 * @route GET /api/stations/
 * @group Stations - Operation about stations
 * @param {string} id.query.required
 * @returns {Station} 200 - Station related to the id
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const station = await getById(req.params.id);
    res.status(200).send(station);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Update or create a Station
 * @route POST /api/stations/
 * @group Stations - Operation about stations
 * @param {string} station.body.required
 * @returns {Station} 200 - Update or create a Station
 * @returns {Error}  default - Unexpected error
 */
router.post('/', async (req: Request, res: Response) => {
  try {
    let result;

    if (Array.isArray(req.body)) {
      const payload:CreateStationDTO[] = req.body;
      result = await createOrUpdateRange(payload);
    } else {
      const payload:CreateStationDTO = req.body;
      result = [await createOrUpdate(payload)];
    }

    emitEvent("onUpdateStation", result);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Get all teams from station
 * @route GET /api/stations/{id}/teams
 * @group Stations - Operation about stations
 * @param {string} id.query.required
 * @returns {Array.<Stations>} 200 - Get all teams from station
 * @returns {Error}  default - Unexpected error
 */
 router.get('/:id/teams', async (req: Request, res: Response) => {
  try {
    const teams = await getTeams(req.params.id);
    res.status(200).send(teams);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

export default router;