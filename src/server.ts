import { initDataBase } from '../src/database/index';
import router from './api/routes';

import cors from 'cors';
import express, { Application, Request, Response, NextFunction } from 'express';
import { Server as HTTPServer, createServer } from "http";
import dotenv from 'dotenv';

import cookkieParser from 'cookie-parser';

dotenv.config();

const SERVER_PORT = Number(process.env.SERVER_PORT)
class Server {

    app: Application;
    server: HTTPServer;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ 
            origin: process.env.CLIENT_URL,
            credentials: true,
        }));
        this.app.use(cookkieParser());

        this.app.use('/api', router);

        this.app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: error.message,
                });
            }
        
            res.status(500).json({
                success: false,
                message: 'Ocorreu um erro inesperado.',
            });
        });

    }

    public listen(port: number, callback: () => void) {
        this.server.listen(port, callback);
    }

    public getApp(): Application {
        return this.app;
    }

    public async start() {
        try {

            await initDataBase().then(() => {
                console.log("=========================================");
                console.log('Conectado ao banco de dados com sucesso!');
            })

            console.log("=========================================");

            this.listen(SERVER_PORT, () => {
                console.log('Servidor iniciado na porta 8000');
                console.log("=========================================");
            });

        } catch (error) {
            console.error('Erro ao iniciar servidor: ', error);
        }

    }

}

export default Server;