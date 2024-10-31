import { TaskMovementService } from "../services";
import { Request, Response, NextFunction } from "express";

class TaskController {

    async getTaskMovements(req: Request, res: Response, next: NextFunction) {
        try {

            const data = await TaskMovementService.find();
            res.status(200).json({ data, success: true, message: 'Tarefas retornadas com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async getTaskMovement(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;
            const data = await TaskMovementService.findById(Number(id));

            res.status(200).json({ data, success: true, message: 'Tarefa retornada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async createTaskMovement(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await TaskMovementService.create(req.body);
            res.status(201).json({ task, success: true, message: 'Tarefa criada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async updateTaskMovement(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const task = await TaskMovementService.update(Number(id), req.body);

            res.status(200).json({ task, success: true, message: 'Tarefa atualizada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

}

export default new TaskController();