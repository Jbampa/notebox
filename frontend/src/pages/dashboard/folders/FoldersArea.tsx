import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FolderItem } from "./FolderItem";
import type { Folder } from "../../../types/folder";
import { createFolder, deleteFolder, getFolders, updateFolder } from "../../../services/folder";
import { SectionHeader } from "../../../components/sectionHeader";
import { useState } from "react";

type FolderAreaProps = {
  selectedFolderId: number | null;
  onSelectFolder: (id: number | null) => void; 
};

export const FoldersArea = ({
  selectedFolderId,
  onSelectFolder,
}: FolderAreaProps) => {

  const queryClient = useQueryClient();

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
      <SectionHeader title="Notes" onAdd={handleAddFolder}/>
      <FolderItem
        title="All Folders"
        isActive={selectedFolderId === null} 
        onClick={() => onSelectFolder(null)} 
        hasActions={false}
      />

      <div className="my-2 border-b border-gray-200" />

      {folders?.map((folder) => (
        <FolderItem
          key={folder.id}
          title={folder.title}
          isActive={folder.id === selectedFolderId}
          onClick={() => onSelectFolder(folder.id)}
          onDelete={() => deleteFolderMutation.mutate(folder.id)}
          onRename={(newTitle) => renameFolderMutation.mutate({id: folder.id, title: newTitle})}
          hasActions={true}
        />
      ))}
    </div>
  );
};