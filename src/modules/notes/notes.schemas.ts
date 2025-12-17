import z from 'zod';

export const createNoteSchema = z.object({
    body: z.object({
        title: z.string({error: "Title is required"}).max(100, {error: "title must be fewer than 100 characters"}),
        body: z.string().optional(),
        folderId: z.number().int()
    })
})
