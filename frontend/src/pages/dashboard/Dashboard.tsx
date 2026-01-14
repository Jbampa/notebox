import { useState } from "react";
import { FoldersArea } from "./folders/FoldersArea";
import { NotesArea } from "./notes/NotesArea";
import { NoteContentArea } from "./note/NoteContentArea";
import { SectionHeader } from "../../components/sectionHeader";

// --- Components & Icons (Extracted for readability) ---

const ArrowLeftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const EmptyStateIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-200 mb-4">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const MobileBackButton = ({ onClick, label }: { onClick: () => void, label: string }) => (
  <div className="flex items-center h-[52px] border-b border-zinc-100 bg-white/80 backdrop-blur-sm shrink-0 lg:hidden px-2">
    <button
      onClick={onClick}
      className="flex items-center text-sm text-zinc-500 hover:text-zinc-900 transition-colors py-2 px-2 rounded-md hover:bg-zinc-100"
    >
      <ArrowLeftIcon />
      <span className="ml-2 font-medium">{label}</span>
    </button>
  </div>
);

export const Dashboard = () => {
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
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
    }
  };

  const handleResetSelection = () => {
    setSelectedFolderId(null);
    setSelectedNoteId(null);
  };

  return (
    <div className="h-full w-full bg-white flex flex-col md:flex-row overflow-hidden font-sans text-zinc-900">

      {/* COLUMN 1: FOLDERS 
        Responsive: Visible on Mobile (if no folder selected) | Visible on Tablet (if no folder selected) | Always Visible on Desktop
      */}
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

      {/* COLUMN 2: NOTES LIST 
        Responsive: Visible on Mobile (if folder selected) | Visible on Tablet (if folder selected) | Always Visible on Desktop
      */}
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

      {/* COLUMN 3: CONTENT EDITOR
        Responsive: Visible on Mobile (if note selected) | Always Visible on Tablet/Desktop
      */}
      <main
        className={`
          flex-col h-full bg-white
          ${viewState.mobile.content ? "flex w-full" : "hidden"}
          md:flex md:flex-1
        `}
      >
        <MobileBackButton onClick={() => setSelectedNoteId(null)} label="Back" />

        <div className="flex-1 overflow-y-auto h-full relative custom-scrollbar">
          {selectedNoteId ? (
            <NoteContentArea selectedNoteId={selectedNoteId} setSelectedNoteId={setSelectedNoteId} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-zinc-300 select-none pb-20">
              <EmptyStateIcon />
              <p className="text-sm font-medium text-zinc-400">No note selected</p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
};