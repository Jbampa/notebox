import { useState } from "react";
import { FoldersArea } from "./folders/FoldersArea";
import { NotesArea } from "./notes/NotesArea";
import { NoteContentArea } from "./note/NoteContentArea";
import {
  ArrowLeftIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

/* ---------------- MOBILE BACK BUTTON ---------------- */

const MobileBackButton = ({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) => (
  <div className="flex items-center h-[52px] border-b border-zinc-100 bg-white/80 backdrop-blur-sm shrink-0 lg:hidden px-2">
    <button
      onClick={onClick}
      className="flex items-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors py-2 px-2 rounded-md hover:bg-zinc-100"
    >
      <ArrowLeftIcon className="h-4 w-4" />
      <span className="ml-2 font-medium">{label}</span>
    </button>
  </div>
);

/* ---------------- DASHBOARD ---------------- */

export const Dashboard = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<
    number | null | "trash"
  >(null);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const viewState = {
    mobile: {
      folders: !selectedFolderId,
      notes: !!selectedFolderId && !selectedNoteId,
      content: !!selectedNoteId,
    },
    medium: {
      folders: !selectedFolderId,
      notes: !!selectedFolderId,
    },
  };

  const handleResetSelection = () => {
    setSelectedFolderId(null);
    setSelectedNoteId(null);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col md:flex-row overflow-hidden font-sans text-zinc-900">
      {/* ================= COLUMN 1: FOLDERS ================= */}
      <aside
        className={`
          flex-col h-full border-r border-zinc-200/80 bg-zinc-50/50
          ${viewState.mobile.folders ? "flex w-full" : "hidden"}
          ${viewState.medium.folders ? "md:flex md:w-[35%]" : "md:hidden"}
          lg:flex lg:w-[260px] lg:shrink-0
        `}
      >
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <FoldersArea
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
          />
        </div>
      </aside>

      {/* ================= COLUMN 2: NOTES ================= */}
      <aside
        className={`
          flex-col h-full border-r border-zinc-200/80 bg-white
          ${viewState.mobile.notes ? "flex w-full" : "hidden"}
          ${viewState.medium.notes ? "md:flex md:w-[35%]" : "md:hidden"}
          lg:flex lg:w-[320px] lg:shrink-0
        `}
      >
        <MobileBackButton onClick={handleResetSelection} label="Folders" />

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <NotesArea
            selectedFolderId={selectedFolderId}
            selectedNoteId={selectedNoteId}
            setSelectedNoteId={setSelectedNoteId}
          />
        </div>
      </aside>

      {/* ================= COLUMN 3: NOTE CONTENT ================= */}
      <main
        className={`
          flex-col h-full bg-white
          ${viewState.mobile.content ? "flex w-full" : "hidden"}
          md:flex md:flex-1
        `}
      >
        <MobileBackButton
          onClick={() => setSelectedNoteId(null)}
          label="Back"
        />

        <div className="flex-1 overflow-y-auto h-full relative custom-scrollbar">
          {selectedNoteId ? (
            <NoteContentArea
              selectedNoteId={selectedNoteId}
              setSelectedNoteId={setSelectedNoteId}
              selectedFolderId={selectedFolderId}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-300 select-none pb-20">
              <DocumentTextIcon className="h-12 w-12 text-zinc-200 mb-4" />
              <p className="text-sm font-medium text-zinc-400">
                No note selected
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
