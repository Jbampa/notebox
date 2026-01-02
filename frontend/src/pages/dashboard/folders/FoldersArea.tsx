import { useQuery } from "@tanstack/react-query";
import { FolderItem } from "./FolderItem";
import type { Folder } from "../../../types/folder";
import { getFolders } from "../../../services/folder";

type FolderAreaProps = {
  selectedFolderId: number | null;
  onSelectFolder: (id: number) => void;
};

export const FoldersArea = ({
  selectedFolderId,
  onSelectFolder,
}: FolderAreaProps) => {

  const {data: folders,
    isLoading,
    isError
  } = useQuery<Folder[]>({
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
      {folders?.map((folder) => (
        <FolderItem
          key={folder.id}
          title={folder.title}
          isActive={folder.id === selectedFolderId}
          onClick={() => onSelectFolder(folder.id)}
        />
      ))}
    </div>
  );
};