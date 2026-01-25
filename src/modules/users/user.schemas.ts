import z from 'zod';

export const updateUserSchema = z.object({
    body: z.object({
        name: z.string().max(50, {error: "Name must be fewer than 50 characters"}).optional(),
        email: z.email().optional(),
        password: z.string().optional(),
    })
})