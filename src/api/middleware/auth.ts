import { NextFunction, Response, Request } from 'express';
import { UserAttributes } from '../../database/schemas/user/interface/user';
import { UserService } from '../../api/modules/user/services';

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
    user?: UserAttributes;
}

export const authToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); 

    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        
        const secret = process.env.JWT_SECRET;

        if (!secret) return res.status(500).json({ message: 'JWT Secret not configured' });

        const verified = jwt.verify(token, secret) as UserAttributes; 

        req.user = verified;

        next();

    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
