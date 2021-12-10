import {Router} from 'express';

import {sensorController} from "../controllers/";

const router = Router();

router.use('/sensors', sensorController);

export default router;