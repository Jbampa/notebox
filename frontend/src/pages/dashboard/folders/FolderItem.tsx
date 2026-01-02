import { FolderIcon } from "@heroicons/react/24/outline";

type FolderProps = {
  title: string;
  isActive: boolean;
  onClick?: () => void;
};

export const FolderItem = ({ title, isActive, onClick }: FolderProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        group w-full text-left
        flex items-center gap-2
        px-3 py-2 rounded-md text-sm
        transition-colors
        outline-0
        mb-2
        overflow-hidden
        focus:outline-none
        active:outline-none
       
        ${isActive ? "bg-gray-300 text-orange-700" : "text-gray-700 hover:bg-gray-200"}

        active:bg-orange-500
        active:text-white
        focus-visible:bg-orange-500
      `}
    >
      <FolderIcon className="h-5 w-5" />
      <span className="truncate">{title}</span>
    </button>
  );
};
