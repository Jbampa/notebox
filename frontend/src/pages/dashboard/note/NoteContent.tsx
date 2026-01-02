type NoteContentProps = {
    noteContent: string | undefined
    setNoteContent: (content: string) => void
}

export const NoteContentItem = ({noteContent, setNoteContent}: NoteContentProps) => {
    return (
        <textarea value={noteContent ?? ""} id="1" onChange={(e) => setNoteContent(e.target.value)} className="w-full h-full
        resize-none
        border-none outline-none
        bg-transparent
        p-0
        font-inherit text-inherit leading-inherit
        overflow-hidden">
        </textarea>
    )
}