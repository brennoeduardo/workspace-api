import { initDataBase } from '../src/database/index';
import router from './api/routes';

import cors from 'cors';
import express, { Application } from 'express';
import { Server as HTTPServer, createServer } from "http";

import { codeGenerator } from '../src/utils/code-generator';

class Server {

    app: Application;
    server: HTTPServer;

    constructor() {
        this.app = express();
        this.server = createServer(this.app);

        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cors({ origin: '*' }));

        this.app.use('/api', router);

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
                console.log("=========================================");
            })

            this.listen(8000, () => {
                console.log("=========================================");
                console.log('Servidor iniciado na porta 8000');
                console.log("=========================================");
            });

            codeGenerator()
            
        } catch (error) {
            console.error('Erro ao iniciar servidor: ', error);
        }

    }

}

export default Server;