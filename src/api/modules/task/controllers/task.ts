import { TaskService } from "../services";
import { Request, Response, NextFunction } from "express";

class TaskController {

    async getTasks(req: Request, res: Response, next: NextFunction) {
        try {

            const data = await TaskService.find();
            res.status(200).json({ data, success: true, message: 'Tarefas retornadas com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async getTask(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;
            const data = await TaskService.findById(Number(id));

            res.status(200).json({ data, success: true, message: 'Tarefa retornada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await TaskService.create(req.body);
            res.status(201).json({ task, success: true, message: 'Tarefa criada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const task = await TaskService.update(Number(id), req.body);

            res.status(200).json({ task, success: true, message: 'Tarefa atualizada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async deleteTask(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            await TaskService.delete(Number(id));

            res.status(200).json({ success: true, message: 'Tarefa deletada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

}

export default new TaskController();