import Crypto from 'crypto-js';

import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.CRYPTO_SECRET || 'secret';

export const encrypt = (text: string): string => {
    if(!text) throw new Error('Text is required');
    return Crypto.AES.encrypt(text, secret).toString();
}

export const decrypt = (text: string): string => {
    if(!text) throw new Error('Text is required');
    return Crypto.AES.decrypt(text, secret).toString(Crypto.enc.Utf8);
}