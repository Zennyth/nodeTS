import {Router, Request, Response} from 'express';

import {getAll, createOrUpdate, getById, createOrUpdateRange, } from "../services/team.service";
import {CreateTeamDTO} from '../db/dto/team.dto';

import {emitEvent} from "../modules/websocket.module";
import { Emergency, Team } from '../db/models';
import { grantAccess, Roles } from '../middlewares/access.middleware';

const router = Router();

/**
 * List of all teams
 * @route GET /api/teams 
 * @group Teams - Operation about teams
 * @returns {Array.<Team>} 200 - List of all teams
 * @returns {Error}  default - Unexpected error
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const teams = await getAll({});
    res.status(200).send(teams);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Team related to the id
 * @route GET /api/teams/
 * @group Teams - Operation about teams
 * @param {string} id.query.required
 * @returns {Team} 200 - Team related to the id
 * @returns {Error}  default - Unexpected error
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await getById(req.params.id);
    res.status(200).send(team);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

/**
 * Update or create a Team
 * @route POST /api/teams/
 * @group Teams - Operation about teams
 * @param {string} team.body.required
 * @returns {Array.<Team>} 200 - Updated or created Teams
 * @returns {Error}  default - Unexpected error
 */
router.post('/', grantAccess(Roles.API_W), async (req: Request, res: Response) => {
  try {
    let result;

    if (Array.isArray(req.body)) {
      const payload:CreateTeamDTO[] = req.body;
      result = await createOrUpdateRange(payload);
    } else {
      const payload:CreateTeamDTO = req.body;
      result = [await createOrUpdate(payload)];
    }

    if (result.length == 0) {
      throw new Error("Bad request");
    }

    emitEvent("onUpdateTeams", result);

    return res.status(200).send(result);
  } catch (error) {
    res.status(400).send({
      error
    })
  }
});

export default router;