import {Router} from 'express';

import {sensorController, emergencyController} from "../controllers/";

const router = Router();

router.use('/sensors', sensorController);
router.use('/emergencies', emergencyController);

export default router;