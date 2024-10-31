import jwt from 'jsonwebtoken';

import dotenv from 'dotenv'

dotenv.config()

const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET.toString() : (
    () => { 
        throw new Error('JWTSecret is not defined in environment variables'); 
    }
)();

export const sign = (payload: any, options?: jwt.SignOptions) => jwt.sign(payload, secret, options);

export const verify = (token: string) => jwt.verify(token, secret);

export const decode = (token: string) => jwt.decode(token);

export default { sign, verify, decode };