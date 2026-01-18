import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderItem } from "./FolderItem";
import type { Folder } from "../../../types/folder";
import { createFolder, deleteFolder, getFolders, updateFolder } from "../../../services/folder";
import { SectionHeader } from "../../../components/sectionHeader";
import { useState } from "react";

type FolderAreaProps = {
  selectedFolderId: number | null | 'trash';
  onSelectFolder: (id: number | null | 'trash') => void; 
};

export const FoldersArea = ({
  selectedFolderId,
  onSelectFolder,
}: FolderAreaProps) => {

  const queryClient = useQueryClient();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [modalSelectedFolder, setModalSelectedFolder] = useState<number | null>(null)


  const createFolderMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['folders']})
    }
  })

  const handleAddFolder = () => {
    const title = "New Note";
    createFolderMutation.mutate(title)
  }

  const deleteFolderMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: (_, deletedFolderId) => {
      queryClient.invalidateQueries({queryKey: ['folders']});
      queryClient.invalidateQueries({queryKey: ['notes']});

      if(selectedFolderId === deletedFolderId) {
        onSelectFolder(null);
      }
    }
  });

  const renameFolderMutation = useMutation({
    mutationFn: updateFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    }
  });

  const { data: folders, isLoading, isError } = useQuery<Folder[]>({
    queryKey: ['folders'],
    queryFn: getFolders
  })

  if (isLoading) {
    return <div className="p-4 text-gray-400">Loading your folders...</div>;
  }

  if (isError) {
    return <div className="p-4 text-red-500">Error loading folders.</div>;
  }

  return (
    <div className="p-2 h-full overflow-auto scrollbar-modern">
      <SectionHeader title="Library" onAdd={handleAddFolder}/>
      <FolderItem
        title="All Folders"
        isActive={selectedFolderId === null} 
        onClick={() => onSelectFolder(null)} 
        hasActions={false}
      />
      <FolderItem
        title="Recently deleted"
        trash={true}
        isActive={selectedFolderId === 'trash'} 
        onClick={() => onSelectFolder('trash')} 
        hasActions={false}
      />

      <div className="my-2 border-b border-gray-200" />

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-[360px] rounded-xl bg-white border border-zinc-200 shadow-lg p-4">
            <h2 className="text-sm font-semibold text-zinc-900 mb-1">
              Delete folder permanently? 
            </h2>

            <p className="text-xs text-zinc-500 mb-4">
              This action cannot be undone. The folder and all notes in it will be permanently removed.
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
                  if (!modalSelectedFolder) return;
                  deleteFolderMutation.mutate(modalSelectedFolder);
                  setConfirmOpen(false);
                  setModalSelectedFolder(null);
                }}
                className="text-sm px-3 py-1.5 rounded-md text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {folders?.map((folder) => (
        <FolderItem
          id={folder.id}
          key={folder.id}
          title={folder.title}
          isActive={folder.id === selectedFolderId}
          onClick={() => onSelectFolder(folder.id)}
          onDelete={(id) => {setConfirmOpen(true) 
            setModalSelectedFolder(id)
          }}
          onRename={(newTitle) => renameFolderMutation.mutate({id: folder.id, title: newTitle})}
          hasActions={true}
        />
      ))}
    </div>
  );
};