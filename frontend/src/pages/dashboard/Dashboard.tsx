import { useState } from "react";
import { FoldersArea } from "./folders/FoldersArea"
import { NoteContentArea } from "./note/NoteContentArea"
import { NotesArea } from "./notes/NotesArea"

export const Dashboard = () => {
    const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

    return (
    <div
        className="
            h-full
            grid
            grid-cols-1
            md:grid-cols-[320px_1fr]
            lg:grid-cols-[240px_320px_1fr]"
    >

        <aside className="hidden lg:block border-r border-[#e6e6ea] h-full overflow-hidden">
            <FoldersArea
                selectedFolderId={selectedFolderId}
                onSelectFolder={setSelectedFolderId}
            ></FoldersArea>
        </aside>


        <aside className="hidden md:block border-r border-[#d4d4d4] h-full overflow-hidden">
            <NotesArea
                selectedFolderId={selectedFolderId}
                selectedNoteId={selectedNoteId}
                setSelectedNoteId={setSelectedNoteId}
            ></NotesArea>
        </aside>

        <section className="h-full overflow-auto">
            <NoteContentArea selectedNoteId={selectedNoteId}></NoteContentArea>
        </section>
    </div>
    )
}