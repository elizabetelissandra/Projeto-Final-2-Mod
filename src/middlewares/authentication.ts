import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { databaseConfig } from '../config/databaseConfig';
import { auth } from './auth';
import { authConfig } from '../config/auth';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Acesso não autorizado' });
        }
    
        try {
            const decoded = jwt.verify(token, authConfig.secret as string);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Token inválido' });
        }
    }

