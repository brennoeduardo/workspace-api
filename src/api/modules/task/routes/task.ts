import { Router } from "express";
import { TaskController } from "../controllers"

const router = Router();

router.route('/')
    .get(TaskController.getTasks)
    .post(TaskController.createTask);

router.route('/:id')
    .get(TaskController.getTask)
    .put(TaskController.updateTask)
    .delete(TaskController.deleteTask);

export default router;