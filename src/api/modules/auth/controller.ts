import AuthService from '../../../services/auth';
import { Request, Response, NextFunction } from "express";

class AuthController {

    async login(req: Request, res: Response, next: NextFunction) {
        try {

            const { email, password } = req.body;
            const token = await AuthService.login(email, password);

            res.cookie("authToken", token, {
                httpOnly: true,
                secure: true,
                maxAge: 48 * 60 * 60 * 1000
            });

            res.status(200).json({ token, success: true, message: 'Login realizado com sucesso!' });

        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response) {

        console.log('Logout realizado com sucesso!');
        res.clearCookie("authToken");
        res.status(200).json({ message: 'Logout realizado com sucesso!' });
    }

    async confirmVerificationCode(req: Request, res: Response, next: NextFunction) {

        try {

            const { code, email } = req.body

            const { message, success } = await AuthService.confirmVerificationCode(code, email)

            res.status(200).json({ success, message })

        } catch (error) {
            next(error)
        }

    }


}

export default new AuthController();