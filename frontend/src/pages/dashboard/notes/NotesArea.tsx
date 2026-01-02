import { NotesItem } from "./NotesItem"
import { useQuery } from "@tanstack/react-query";
import type { Note } from "../../../types/notes";
import { getAllNotes } from "../../../services/notes";
import { formatShortDate } from "../../../utils/date";

type NotesAreaProps = {
  selectedFolderId: number | null;
  selectedNoteId: number | null;
  setSelectedNoteId: (id: number) => void;
};

export const NotesArea = ({ selectedFolderId, selectedNoteId, setSelectedNoteId }: NotesAreaProps) => {

    const {
        data: notes,
        isLoading, 
        isError
    } = useQuery<Note[]>({
        queryKey: ['notes', { folderId: selectedFolderId }], 
        
        queryFn: () => getAllNotes(selectedFolderId) 
    })

    if (isLoading) {
        return <div className="p-4 text-gray-500 text-sm">Loading your notes...</div>
    }

    if (isError) {
        return <div className="p-4 text-red-500 text-sm">Error loading notes.</div>
    }

    return(    
        <div className="p-2 h-full overflow-auto scrollbar-modern">

            {notes?.length === 0 ? (
                <div className="text-center text-gray-400 mt-10 text-sm">
                    Nenhuma nota encontrada nesta pasta.
                </div>
            ) : (
                notes?.map((note) => (
                    <NotesItem 
                        key={note.id}
                        id={note.id} 
                        title={note.title}
                        body={note.body} 
                        isActive={note.id === selectedNoteId} 
                        onClick={() => setSelectedNoteId(note.id)} 
                        date={formatShortDate(note.updatedAt)} 
                        folderName={note.folder?.title || "Sem Pasta"}
                    />
                ))
            )}

        </div>
    )
}