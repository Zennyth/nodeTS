import {Router} from 'express';

import {sensorController, emergencyController, stationController, teamController, } from "../controllers/";

const router = Router();

router.use('/sensors', sensorController);
router.use('/emergencies', emergencyController);
router.use('/stations', stationController);
router.use('/teams', teamController);

export default router;