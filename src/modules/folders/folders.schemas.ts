import z from 'zod';

export const createFolderSchema = z.object({
    body: z.object({
        title: z.string({error: 'Title is required'}).max(100, {error: "Title must be fewer than 100 characters"}),
        emoji: z.string().optional()
    })
})

export const updateFolderSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    }),
    body: z.object({
        title: z.string({error: 'Title is required'}).max(100, {error: "Title must be fewer than 100 characters"}),
        emoji: z.string().optional()
    })
})

export const deleteFolderSchema = z.object({
    params: z.object({
        id: z.coerce.number().int().positive()
    })
})