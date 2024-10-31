import { Router } from "express";
import { TaskMovementController } from "../controllers"

const router = Router();

router.route('/')
    .get(TaskMovementController.getTaskMovements)
    .post(TaskMovementController.createTaskMovement);

router.route('/:id')
    .get(TaskMovementController.getTaskMovement)
    .put(TaskMovementController.updateTaskMovement)

export default router;