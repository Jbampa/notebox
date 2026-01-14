import { useState, useRef, useEffect } from "react";
import { FolderIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

type FolderProps = {
  title: string;
  isActive: boolean;
  onClick?: () => void;
  onDelete?: () => void;
  onRename?: (newTitle: string) => void;
  hasActions?: boolean;
};

export const FolderItem = ({ title, isActive, onClick, onDelete, onRename, hasActions }: FolderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        cancel()
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const save = () => {

    const trimmed = value.trim();
    if(!trimmed || trimmed == title) {
      cancel()
      return
    }

    onRename?.(trimmed);
    setIsEditing(false);
  }

  const cancel = () => {
    setValue(title);  
    setIsEditing(false);
  };

  return (
    <div
      className={`
        group relative w-full
        flex items-center justify-between gap-2
        px-3 py-2 rounded-md text-sm
        transition-colors mb-2 cursor-pointer
        
        ${isActive 
          ? "bg-gray-300 text-orange-700" 
          : "text-gray-700 hover:bg-gray-200"
        }
      `}
      // Passamos o click principal para a div wrapper, mas controlamos a propagação no menu
      onClick={onClick}
    >
      {/* LADO ESQUERDO: Ícone + Título (com truncate corrigido) */}

      {isEditing ? (
        <div className="flex items-center gap-2 flex-1 min-w-0">
        <FolderIcon className="h-5 w-5 shrink-0" /> 
          <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              save();
            }
            if (e.key === "Escape") {
              cancel()
            }
          }}
          autoFocus
          className="
            w-full bg-transparent
            outline-none border-b
            border-orange-400
            text-sm font-medium
          "
        />
        </div>
      ): 
      (<div className="flex items-center gap-2 flex-1 min-w-0 border-none">
          <FolderIcon className="h-5 w-5 shrink-0" /> 
          <span className="truncate font-medium">
              {value}
          </span>
      </div>)
      }     
      

      {/* LADO DIREITO: Menu de Opções */}
      {/* O clique aqui não deve ativar a seleção da pasta (stopPropagation) */}
      <div 
        className="relative shrink-0" 
        onClick={(e) => e.stopPropagation()}
        ref={menuRef}
      >{hasActions && (
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`
            p-1 rounded-full transition-colors
            flex items-center justify-center
            hover:bg-gray-400/30
            focus:outline-none  focus:ring-orange-500/50
            ${isMenuOpen ? "bg-gray-400/30 text-gray-900" : ""}
          `}
        >
          <EllipsisHorizontalIcon className="h-5 w-5" />
        </button>)
        }
        

        {isMenuOpen && (
          <div className="fixed z-50 w-48 origin-top-right rounded-lg bg-white border-gray-100 shadow focus:outline-none animate-in fade-in zoom-in-95 duration-100">
            <div>
              <button
                className="group flex w-full items-center px-4 py-2 rounded-t-lg text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700"
                onClick={() => {
                  setIsMenuOpen(false);
                  setIsEditing(true);
                }}
              >
                <PencilIcon className="mr-3 h-4 w-4 text-gray-400 group-hover:text-orange-500" />
                Rename Folder
              </button>
              
              <button
                className="group flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                onClick={() => {
                  setIsMenuOpen(false);
                  onDelete?.();
                }}
              >
                <TrashIcon className="mr-3 h-4 w-4 text-red-400 group-hover:text-red-600" />
                Delete Folder
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};