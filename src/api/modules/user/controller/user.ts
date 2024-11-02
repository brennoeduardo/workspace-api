import { uploadToImageS3 } from "../../../../services/aws";
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

    async updateAvatar(req: Request, res: Response, next: NextFunction) {
        try {

            const { id } = req.params;
            
            const file = req.file; 

            if(!id) throw new Error('Id não encontrado!');
            if (!file) throw new Error('Imagem não encontrada!');

            const url = await UserService.updateAvatar(Number(id), file);

            res.status(200).json({ url, success: true, message: 'Avatar atualizado com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async getAvatar(req: Request, res: Response, next: NextFunction) {
        try {
            
            const { id } = req.params;

            const user = await UserService.findById(Number(id));

            if (!user) throw new Error('Usuario não encontrado!');

            res.status(200).json({ data: user.avatar, success: true, message: 'Avatar retornado com sucesso!' });


        } catch (error) {
            next(error);       
        }
    }

}

export default new UserController();