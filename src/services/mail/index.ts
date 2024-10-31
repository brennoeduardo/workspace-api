import dotenv from 'dotenv'
import { Transporter, createTransport, SendMailOptions } from 'nodemailer'

dotenv.config()

class Mailer {

    private transporter: Transporter;

    constructor() {
        this.transporter = createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            }
        })
    }

    public async sendMail(options: SendMailOptions) {

        return await this.transporter.sendMail({
            from: process.env.USER_MAIL,
            to: options.to,
            subject: options.subject,
            text: options.text
        })

    }

}

export default new Mailer()