import { Router } from "express";

import taskRouter from '../routes/task';
import statusRouter from "../routes/status";
import movementRouter from "../routes/movement";

const router = Router();

router.use('/', taskRouter);
router.use('/status', statusRouter)
router.use('/movement', movementRouter)

export default router;