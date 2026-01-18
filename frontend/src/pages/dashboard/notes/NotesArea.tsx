import { NotesItem } from "./NotesItem"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../../types/notes";
import { createNote, getAllNotes } from "../../../services/notes";
import { formatShortDate } from "../../../utils/date";
import { SectionHeader } from "../../../components/sectionHeader";

type NotesAreaProps = {
  selectedFolderId: number | null | 'trash';
  selectedNoteId: number | null;
  setSelectedNoteId: (id: number) => void;
};

export const NotesArea = ({ selectedFolderId, selectedNoteId, setSelectedNoteId }: NotesAreaProps) => {

    const isTrash = selectedFolderId === 'trash';

    const queryClient = useQueryClient()

    const createNoteMutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["notes"]})
        }
    })

    const handleAddNote = () => {
        if(selectedFolderId && selectedFolderId != 'trash') {
            createNoteMutation.mutate({
                title: "New Note",
                folderId: selectedFolderId,
            });
        } else return alert('Select a folder to create a note!')
    }
    
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
            <SectionHeader title="Notes" onAdd={handleAddNote}/>
            {notes?.length === 0 ? (
                <div className="text-center text-gray-400 mt-10 text-sm">
                    No note found in this folder.
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
                        trash={isTrash}
                        folderName={note.folder?.title || "No Folder"}
                    />
                ))
            )}

        </div>
    )
}