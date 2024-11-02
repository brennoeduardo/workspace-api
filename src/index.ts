import { uploadToImageS3 } from '../src/services/aws';
import Server from '../src/server'

const server = new Server();

server.start();
