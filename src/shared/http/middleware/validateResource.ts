import { NextFunction, RequestHandler } from "express";
import { ZodError, ZodType } from "zod";
import { AnyZodObject } from "zod/v3";

export const validateResource = (zodSchema: ZodType): RequestHandler => (req, res, next) => {
    const result = zodSchema.safeParse(req.body);

    if(!result.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors: result.error
        });
    }

    req.body = result.data;

    next();
} 