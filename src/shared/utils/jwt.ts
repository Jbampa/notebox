import { Prisma } from '@prisma/client';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET as string;

if(!secret) {
    throw new Error("JWT secret not defined (.env)")
}

export const createJwt = (userId: number) => {
    return jwt.sign({id: userId}, secret, {
        expiresIn: '30d'
    })
}

export const verifyJwt = (token: string) => {
    try {
        return jwt.verify(token, secret)
    } catch (err) {
        return null;
    }
}