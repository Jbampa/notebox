import { useQuery } from "@tanstack/react-query";
import { getNote, updateNote } from "../../../services/notes";
import type { Note } from "../../../types/notes";
import { NoteContentItem } from "./NoteContent";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNote } from "../../../services/notes";
import { TrashIcon } from "@heroicons/react/24/outline";
import { SectionHeader } from "../../../components/sectionHeader";

type NoteContentProps = {
  selectedNoteId: number | null;
  setSelectedNoteId: (id: number | null) => void;
};

export const NoteContentArea = ({ selectedNoteId, setSelectedNoteId }: NoteContentProps) => {


  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note"] });

      setSelectedNoteId(null)
    },
  });


  const {
    data: selectedNote,
    isLoading,
    isError,
  } = useQuery<Note>({
    queryKey: ["note", selectedNoteId],
    queryFn: () => getNote(selectedNoteId!),
    enabled: !!selectedNoteId,
  });

  const [content, setNoteContent] = useState("");

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedContentRef = useRef<string>("");

  useEffect(() => {
    if (selectedNote?.body !== undefined) {
      setNoteContent(selectedNote.body);
      lastSavedContentRef.current = selectedNote.body;
    }
  }, [selectedNoteId, selectedNote?.body]);

  useEffect(() => {
    if (!selectedNoteId) return;

    if (content === lastSavedContentRef.current) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await updateNote(selectedNoteId, { body: content });
        lastSavedContentRef.current = content;
        console.log("New content saved succesfully");
      } catch (err) {
        console.error("Error while saving new content", err);
      }
    }, 5000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [content, selectedNoteId]);

  if (isLoading) {
    return <div className="p-4 text-gray-400">Loading your note...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error loading note.</div>;
  }

  return (
    <div
      className="
        p-2 h-full
        overflow-y-auto overflow-x-hidden
        scrollbar-modern
        whitespace-pre-wrap
        wrap-break-word
      "
    >
      <button
      onClick={() => deleteMutation.mutate(selectedNoteId!)}
      className="
        text-sm text-red-600
        hover:text-red-700
        px-2 py-1
        rounded-md
        hover:bg-red-50
        transition
      "
    >
      <TrashIcon className="h-5 w-5" />
      </button>
          <NoteContentItem
        noteContent={content}
        setNoteContent={setNoteContent}
      />
    </div>
  );
};
