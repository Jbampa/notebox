import { useEffect, useRef, useState } from "react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  userName?: string;
  avatarUrl?: string | null;
  onEditProfile?: () => void;
  onLogout?: () => void;
};

export default function Header({
  userName = "User",
  avatarUrl,
  onEditProfile
}: HeaderProps) {
  const navigate = useNavigate();
  const { signOut } = useAuth() 
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const initial = userName.charAt(0).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between h-12 px-2 bg-[#f5f5f7] border-b border-[#e6e6ea]">
      {/* Logo */}
      <div className="px-2 font-semibold text-zinc-900">
        Notebox
      </div>

      {/* Right side */}
      <div className="relative flex items-center gap-3" ref={menuRef}>
        <button className="text-sm text-zinc-600 hover:text-orange-600 transition-colors">
          Go to boxes
        </button>

        {/* Avatar */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="
            w-8 h-8
            rounded-full
            flex items-center justify-center
            overflow-hidden
            bg-zinc-300
            text-zinc-700
            text-sm font-semibold
            select-none
            hover:ring-2 hover:ring-orange-500/40
            transition
          "
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              className="w-full h-full object-cover"
            />
          ) : (
            initial
          )}
        </button>

        {/* Dropdown */}
        {open && (
          <div
            className="
              absolute right-0 top-11
              w-48
              rounded-xl
              bg-white
              border border-zinc-200
              shadow-lg
              z-50
              animate-in fade-in zoom-in-95
            "
          >
            <button
              onClick={() => {
                setOpen(false);
                navigate('/edit', {replace: true});
              }}
              className="
                group
                flex items-center gap-2
                w-full
                rounded-t-xl
                px-3 py-2
                text-sm
                text-zinc-700
                transition
                hover:bg-orange-50
                hover:text-orange-700
              "
            >
              <UserCircleIcon className="h-4 w-4 text-zinc-400 transition group-hover:text-orange-500" />
              Edit profile
            </button>

            <div className="h-px bg-zinc-100" />

            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="
                group
                flex items-center gap-2
                w-full
                px-3 py-2
                rounded-b-xl
                text-sm
                text-red-600
                transition
                hover:bg-red-50
              "
            >
              <ArrowRightOnRectangleIcon className="h-4 w-4 text-red-400 transition group-hover:text-red-600" />
              Log out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
