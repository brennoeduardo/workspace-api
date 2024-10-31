
import { UserService } from '../../api/modules/user/services'
import { decrypt } from '../../utils/crypt'
import { sign } from '../../utils/jwt'

import { codeGenerator } from "../../utils/code-generator";

import Mailer from '../mail'

class AuthService {

    public async login(email: string, password: string) {

        try {

            if (!email) throw new Error('Email is required')
            if (!password) throw new Error('Password is required')

            const user = await UserService.findOne({ where: { email } })
            if (!user) throw new Error('User not found')

            if (!user.confirmed) {

                await this.sendEmailAgain(Number(user.id))

                return { message: 'Usuário não confirmado', success: false, confirmed: false }
            }

            const decryptPassword = decrypt(user.password)

            if (decryptPassword !== password) throw new Error('Invalid password')

            return sign({ id: user.id, email: user.email, confirmed: true }, { expiresIn: '48h' })

        } catch (error) {
            throw error
        }
    }


    public async confirmVerificationCode(code: string, email: string): Promise<{ message: string, success: boolean }> {
        try {

            const user = await UserService.findOne({ where: { email } })
            if (!user) throw new Error('User not found')


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