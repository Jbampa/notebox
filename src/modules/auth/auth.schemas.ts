import z from 'zod';

export const signUpSchema = z.object({
    body: z.object({
        name: z.string({error: "Name is required"}).min(3, {error: "Name must be at least 3 characters"}),
        email: z.email({error: "E-mail is required"}),
        password: z.string({error: "Password is required"})
    })
})

export const signInSchema = z.object({
    body: z.object({
        email: z.email({error: "E-mail is required"}),
        password: z.string({error: "Password is required"})
    })
})

