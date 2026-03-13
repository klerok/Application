import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader  = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY || 'secret')
            if (!decoded) return res.sendStatus(403);
            next()
        } catch (error) {
            return res.sendStatus(403)
        }
    }
    
}