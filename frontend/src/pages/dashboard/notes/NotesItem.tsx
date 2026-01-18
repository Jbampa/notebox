import { useState } from "react";
import { FolderIcon } from "@heroicons/react/24/outline";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNote } from "../../../services/notes";

type NotesProps = {
  id: number;
  title: string;
  body: string;
  isActive: boolean;
  date: string;
  folderName: string;
  trash?: boolean;
  onClick?: () => void;
};

export const NotesItem = ({
  id,
  title,
  body,
  isActive,
  date,
  folderName,
  trash,
  onClick,
}: NotesProps) => {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(title);

  const queryClient = useQueryClient();

  const { mutateAsync: updateTitle } = useMutation({
    mutationFn: (newTitle: string) =>
      updateNote(id, { title: newTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const save = async () => {
    const newTitle = value.trim();

    if (!newTitle) {
      setValue(title);
      setEditing(false);
      return;
    }

    if (newTitle !== title) {
      await updateTitle(newTitle);
    }

    setEditing(false);
  };

  return (
    <button
      onClick={!editing ? onClick : undefined}
      className={`
        w-full text-left px-3 py-4 rounded-md my-0.5
        ${isActive ? "bg-gray-300 text-orange-700" : "hover:bg-gray-200"}
        ${trash ? "border border-red-700": ""}
      `}
    >
      <div className={`flex flex-col gap-2 w-full min-w-0 `}>
        {/* TÍTULO */}
        {editing ? (
          <input
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && save()}
            onBlur={save}
            className="
              text-2xl font-bold
              bg-transparent outline-none
              border-b border-gray-300
              focus:border-orange-500
            "
          />
        ) : (
          <span
            onClick={(e) => {
              e.stopPropagation();
              setEditing(true);
            }}
            className="
              text-2xl font-bold truncate
              cursor-text
              border-b border-transparent
              hover:border-gray-300
            "
          >
            {value}
          </span>
        )}

        <span className="truncate text-sm">{body}</span>
        <span className="text-xs font-bold">{date}</span>

        <span className="flex items-center truncate text-xs">
          <FolderIcon className="h-4 w-4 mr-1" />
          {folderName}
        </span>
      </div>
    </button>
  );
};
