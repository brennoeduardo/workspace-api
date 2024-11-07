
import { UserService } from '../../api/modules/user/services'
import { decrypt } from '../../utils/crypt'
import { sign } from '../../utils/jwt'

import { codeGenerator } from "../../utils/code-generator";

import Mailer from '../mail'

class AuthService {

    public async login(email: string, password: string) {
        try {

            if (!email) throw new Error('E-mail é obrigatório');
            if (!password) throw new Error('Senha é obrigatória');

            const findUser = await UserService.findOne({ where: { email } });
            if (!findUser) throw new Error('Usuário não encontrado');

            if (!findUser.confirmed) {
                await this.sendEmailAgain(Number(findUser.id));
                return { message: 'Usuário não confirmado', success: false, confirmed: false };
            }

            const decryptPassword = decrypt(findUser.password);
            if (decryptPassword !== password) throw new Error('Senha incorreta');

            const authenticatedUser = {
                id: findUser.id,
                name: findUser.name,
                email: findUser.email,
                avatar: findUser.avatar,
                confirmed: true
            };

            return sign(authenticatedUser, { expiresIn: '48h' });
            
        } catch (error) {
            throw error;
        }
    }


    public async confirmVerificationCode(code: string, email: string): Promise<{ message: string, success: boolean }> {
        try {

            const user = await UserService.findOne({ where: { email } })
            if (!user) throw new Error('Usuário não encontrado')

            if (code === user.confirmation_code) {
                await UserService.update(Number(user.id), { confirmation_code: null, confirmed: true })
                return { message: 'Código verificado com sucesso!', success: true }
            }

            return { message: 'Código errado, verifique seu e-mail novamente!', success: false }

        } catch (error) {
            throw error
        }

    }

    public async sendEmailAgain(usuario_id: number) {
        try {

            const confirmation_code = codeGenerator()

            const user = await UserService.findOne({ where: { id: usuario_id } })

            if (user) {

                await UserService.update(Number(user.id), { confirmation_code })

                await Mailer.sendMail({
                    to: user.email,
                    subject: 'Código de Verificação - WorkSpace',
                    text: `Olá ${user.name} \n Esse é seu código de verificação para confirmar seu acesso no WorkSpace: ${confirmation_code}`
                })

            }

        } catch (error) {
            throw error
        }

    }

}

export default new AuthService()