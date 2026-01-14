import z from 'zod';

export const createTrackerSchema = z.object({
    body: z.object({
        title: z.string().max(50, {error: "Title must be fewer than 50 characters"}),
        isCurrency: z.boolean().default(false),
        isInteger: z.boolean().default(false),
        stepValue: z.number().positive().default(1)
    })
})

export const updateTrackerSchema = z.object({
    params: z.object({
        trackerId: z.coerce.number().int().positive()
    }),
    body: z.object({
        title: z.string().min(1, {error: "Title must have at least 1 character"}).max(50, {error: "Title must be fewer than 50 characters"}).optional(),
        value: z.number().optional(),
        isCurrency: z.boolean().optional(),
        isInteger: z.boolean().optional(),
        stepValue: z.number().positive().optional()
    })
})

export const deleteTrackerSchema = z.object({
    params: z.object ({
        trackerId: z.coerce.number().int().positive()
    })
})