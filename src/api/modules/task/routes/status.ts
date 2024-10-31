import { Router } from "express";
import { TaskStatusController } from "../controllers"

const router = Router();

router.route('/')
    .get(TaskStatusController.getStatus)
    .post(TaskStatusController.createStatus);

router.route('/:id')
    .get(TaskStatusController.getOneStatus)
    .put(TaskStatusController.updateStatus)
    .delete(TaskStatusController.deleteStatus);

export default router;