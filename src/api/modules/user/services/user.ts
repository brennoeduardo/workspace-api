import { FindOptions } from "sequelize";
import { UserAttributes, UserUpdateAttributes } from "../../../../database/schemas/user/interface";
import { User } from "../../../../database/schemas/user/model";
import { codeGenerator } from "../../../../utils/code-generator";

import Mailer from '../../../../services/mail'
import { uploadToImageS3 } from "../../../../services/aws";

class UserService {

    async find(options?: FindOptions<UserAttributes>) {
        return await User.findAll(options);
    }

    async findOne(options: FindOptions<UserAttributes>) {
        return await User.findOne(options);
    }

    async findById(id: number) {
        return await User.findByPk(id);
    }

    async create(payload: UserAttributes) {

        const user = await User.create(payload);

        const confirmation_code = codeGenerator()

        if (user) {

            await this.update(Number(user.id), { confirmation_code })

            await Mailer.sendMail({
                to: user.email,
                subject: 'Código de Verificação - WorkSpace',
                text: `Olá ${user.name} \n Esse é seu código de verificação para confirmar seu acesso no WorkSpace: ${confirmation_code}`
            })
        }

    }

    async update(id: number, payload: UserUpdateAttributes) {
        return await User.update(payload, { where: { id } });
    }

    async delete(id: number) {
        const options = { where: { id } };
        return await User.destroy(options);
    }

    async updateAvatar(id: number, file: Express.Multer.File) {

        const user = await this.findById(id);
        if (!user) throw new Error('Usuário não encontrado!');

        const fileUrl = await uploadToImageS3(file, user);

        if(!fileUrl) throw new Error('Erro ao fazer upload da imagem!');

        await this.update(id, { avatar: fileUrl.url });

        return fileUrl.url;
    }


}

export default new UserService();