import { PlusCircleIcon } from "@heroicons/react/24/outline";

type SectionHeaderProps = {
    title: string,
    showOnMobile?: boolean,
    onAdd: () => void
}


export const SectionHeader = ({ title, showOnMobile = true, onAdd }: SectionHeaderProps) => (
  <div className={`justify-between items-center px-4 h-[52px] border-b shrink-0 ${showOnMobile ? 'flex' : 'hidden lg:flex'} ${title === 'Library' ? 'border-zinc-200/60 bg-zinc-50' : 'border-zinc-100 bg-white/80 backdrop-blur-sm'}`}>
    <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
      {title}
    </span>
    <button
        onClick={onAdd}
        className="
            flex items-center gap-1
            text-orange-300
            hover:text-orange-700
            transition
        "
        >
        <PlusCircleIcon className="h-5 w-5" />
    </button>

  </div>
);