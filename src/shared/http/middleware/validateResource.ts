import { NextFunction, RequestHandler } from "express";
import { ZodError, ZodType } from "zod";
import { AnyZodObject } from "zod/v3";

export const validateResource = (zodSchema: ZodType): RequestHandler => (req, res, next) => {
    const result = zodSchema.safeParse({
        body: req.body,
        params: req.params,
        query: req.query
    });

    if(!result.success) {
        return res.status(400).json({
            status: 'error',
            message: 'Validation error',
            errors: result.error
        });
    }

    const validatedResponse = result.data as Record<string, any>

    req.body = validatedResponse.body || req.body;
    req.query = validatedResponse.query || req.query;
    req.params = validatedResponse.params || req.params;

    next();
} 