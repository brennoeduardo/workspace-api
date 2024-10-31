import { TaskStatusService } from "../services";
import { Request, Response, NextFunction } from "express";

class TaskStatusController {

    async getStatus(req: Request, res: Response, next: NextFunction) {
        try {

            const data = await TaskStatusService.find();
            res.status(200).json({ data, success: true, message: 'Status retornadas com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async getOneStatus(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;
            const data = await TaskStatusService.findById(Number(id));

            res.status(200).json({ data, success: true, message: 'Status retornado com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async createStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await TaskStatusService.create(req.body);
            res.status(201).json({ task, success: true, message: 'Status criada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async updateStatus(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const task = await TaskStatusService.update(Number(id), req.body);

            res.status(200).json({ task, success: true, message: 'Status atualizada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async deleteStatus(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;

            await TaskStatusService.delete(Number(id));

            res.status(200).json({ success: true, message: 'Status deletada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

}

export default new TaskStatusController();