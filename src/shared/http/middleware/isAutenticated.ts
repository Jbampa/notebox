import { User } from "@prisma/client";
import { RequestHandler } from "express";
import passport from "passport";

export const isAutenticated: RequestHandler = (req, res, next) => {
    const authStrategy = passport.authenticate('jwt', (err: any, response: Omit<User, "password">, info: any) => {
        if(err) {
            return next(err)
        }

        if(!response) {
            return res.status(401).json({
                error: "Access denied",
                details: info ? info.message : undefined
            })
        }

        req.user = response;

        return next()
    });

    authStrategy(req, res, next);
}