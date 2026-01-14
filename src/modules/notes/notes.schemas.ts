import z from 'zod';

export const createNoteSchema = z.object({
    body: z.object({
        title: z.string({error: "Title is required"}).max(100, {error: "Title must be fewer than 100 characters"}),
        body: z.string().optional(),
        folderId: z.number().int()
    })
})

export const updateNoteSchema = z.object({
    params: z.object({
        noteId: z.coerce.number().int().positive()
    }),
    body: z.object({
        title: z.string().max(100, {error: "Title must be fewer than 100 characters"}).optional(),
        body: z.string().optional()
    })
})

export const deleteNoteSchema = z.object({
    params: z.object ({
        noteId: z.coerce.number().int().positive()
    })
})