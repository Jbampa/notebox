import { useQuery } from "@tanstack/react-query";
import { getNote, updateNote } from "../../../services/notes";
import type { Note } from "../../../types/notes";
import { NoteContentItem } from "./NoteContent";
import { useEffect, useRef, useState } from "react";

type NoteContentProps = {
  selectedNoteId: number | null;
};

export const NoteContentArea = ({ selectedNoteId }: NoteContentProps) => {
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
        console.log("Nota salva automaticamente");
      } catch (err) {
        console.error("Erro ao salvar nota", err);
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
      <NoteContentItem
        noteContent={content}
        setNoteContent={setNoteContent}
      />
    </div>
  );
};
