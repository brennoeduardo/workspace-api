import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export const sequelize = new Sequelize(
    process.env.DB_NAME!,
    process.env.DB_USER!,
    process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
})

export const initDataBase = async () => {
    try {
        
        await sequelize.authenticate()
        await sequelize.sync()

    } catch (error) {
        console.error('Erro ao conectar ao banco de dados: ', error);
    }
}
