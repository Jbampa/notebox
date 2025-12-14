import z from 'zod';

export const createFolderSchema = z.object({
    body: z.object({
        title: z.string({error: 'Title is required'}).max(100),
        emoji: z.string().optional()
    })
})

export const updateFolderSchema = z.object({
    params: z.object({
        id: z.uuid().or(z.string())
    }),
    body: z.object({
        title: z.string({error: 'Title is required'}).max(100),
        emoji: z.string().optional()
    })
})

export const deleteFolderSchema = z.object({
    params: z.object({
        id: z.uuid().or(z.string())
    })
})