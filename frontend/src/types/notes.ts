export type Note = {
    id: number,
    title: string,
    body: string,
    createdAt: string,
    updatedAt: string,
    folderId: number,
    folder: {
        title: string
    }
}