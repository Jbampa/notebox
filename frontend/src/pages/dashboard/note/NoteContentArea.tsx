import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNote,
  restoreNote,
  softDeleteNote,
  updateNote,
  deleteNote,
} from "../../../services/notes";
import type { Note } from "../../../types/notes";
import { NoteContentItem } from "./NoteContent";
import { useEffect, useRef, useState } from "react";
import { TrashIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

type NoteContentProps = {
  selectedNoteId: number | null;
  setSelectedNoteId: (id: number | null) => void;
  selectedFolderId?: number | null | "trash";
};

type SaveStatus = "saving" | "saved" | null;

export const NoteContentArea = ({
  selectedNoteId,
  setSelectedNoteId,
  selectedFolderId,
}: NoteContentProps) => {
  const isTrash = selectedFolderId === "trash";
  const queryClient = useQueryClient();

  /* ---------------- SAVE STATUS UI ---------------- */
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(null);

  /* ---------------- HARD DELETE MODAL ---------------- */
  const [confirmOpen, setConfirmOpen] = useState(false);

  /* ---------------- MUTATIONS ---------------- */

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note"] });
      setSelectedNoteId(null);
    },
  });

  const recoverMutation = useMutation({
    mutationFn: restoreNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note"] });
      setSelectedNoteId(null);
    },
  });

  const softDeleteMutation = useMutation({
    mutationFn: softDeleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      queryClient.invalidateQueries({ queryKey: ["note"] });
      setSelectedNoteId(null);
    },
  });

  /* ---------------- QUERY ---------------- */

  const { data: selectedNote, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", selectedNoteId],
    queryFn: () => getNote(selectedNoteId!),
    enabled: !!selectedNoteId,
  });

  /* ---------------- AUTOSAVE LOGIC ---------------- */

  const [content, setNoteContent] = useState("");
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSavedContentRef = useRef("");

  // ⚠️ Flag para ignorar autosave ao trocar de nota
  const isInitializingRef = useRef(false);

  // Carrega conteúdo ao trocar de nota
  useEffect(() => {
    if (selectedNote?.body !== undefined) {
      isInitializingRef.current = true;

      setNoteContent(selectedNote.body);
      lastSavedContentRef.current = selectedNote.body;

      // libera o autosave no próximo tick
      setTimeout(() => {
        isInitializingRef.current = false;
      }, 0);
    }
  }, [selectedNoteId, selectedNote?.body]);

  // Autosave com debounce
  useEffect(() => {
    if (!selectedNoteId) return;
    if (isInitializingRef.current) return; // 👈 CORREÇÃO DO BUG
    if (content === lastSavedContentRef.current) return;

    setSaveStatus("saving");

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(async () => {
      try {
        await updateNote(selectedNoteId, { body: content });
        lastSavedContentRef.current = content;

        setSaveStatus("saved");

        setTimeout(() => {
          setSaveStatus(null);
        }, 2000);
      } catch {
        setSaveStatus(null);
      }
    }, 3000);

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
    <>
      {/* ================= SAVE STATUS ================= */}
      {saveStatus && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 z-40">
          <div
            className={`
              px-3 py-1.5 rounded-full text-xs font-medium
              shadow-sm border transition-all
              ${
                saveStatus === "saving"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-green-50 text-green-700 border-green-200"
              }
            `}
          >
            {saveStatus === "saving" ? "Saving…" : "Saved"}
          </div>
        </div>
      )}

      {/* ================= HARD DELETE CONFIRM MODAL ================= */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-[360px] rounded-xl bg-white border border-zinc-200 shadow-lg p-4">
            <h2 className="text-sm font-semibold text-zinc-900 mb-1">
              Delete note permanently?
            </h2>

            <p className="text-xs text-zinc-500 mb-4">
              This action cannot be undone. The note will be permanently removed.
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setConfirmOpen(false)}
                className="text-sm px-3 py-1.5 rounded-md hover:bg-zinc-100 text-zinc-600"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  if (!selectedNoteId) return;
                  deleteMutation.mutate(selectedNoteId);
                  setConfirmOpen(false);
                }}
                className="text-sm px-3 py-1.5 rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= NOTE CONTENT ================= */}
      <div
        className="
          p-2 h-full
          overflow-y-auto overflow-x-hidden
          scrollbar-modern
          whitespace-pre-wrap
          break-words
        "
      >
        <div className="flex items-center gap-2 mb-2">
          {isTrash ? (
            <>
              <button
                title="Permanently delete note"
                onClick={() => setConfirmOpen(true)}
                className="p-2 rounded-md hover:bg-red-50 text-red-600"
              >
                <TrashIcon className="h-5 w-5" />
              </button>

              <button
                title="Restore note"
                onClick={() => recoverMutation.mutate(selectedNoteId!)}
                className="p-2 rounded-md hover:bg-green-50 text-green-600"
              >
                <ArrowUturnLeftIcon className="h-5 w-5" />
              </button>
            </>
          ) : (
            <button
              title="Move to trash"
              onClick={() => softDeleteMutation.mutate(selectedNoteId!)}
              className="p-2 rounded-md hover:bg-red-50 text-red-600"
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <NoteContentItem
          noteContent={content}
          setNoteContent={setNoteContent}
        />
      </div>
    </>
  );
};
