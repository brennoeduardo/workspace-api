import { UserService } from "../services";
import { Request, Response, NextFunction } from "express";

class UserController {

    async getUsuario(req: Request, res: Response, next: NextFunction) {
        try {

            const data = await UserService.find();
            res.status(200).json({ data, success: true, message: 'Usuarios retornadas com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async getUsuarios(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;
            const data = await UserService.findById(Number(id));

            res.status(200).json({ data, success: true, message: 'Usuario retornado com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async createUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const task = await UserService.create(req.body);
            res.status(201).json({ task, success: true, message: 'Usuario criado com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async updateUsuario(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;

            const task = await UserService.update(Number(id), req.body);

            res.status(200).json({ task, success: true, message: 'Usuario atualizada com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

}

export default new UserController();