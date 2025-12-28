import { FoldersArea } from "../components/dashboard/FoldersArea"

export const Dashboard = () => {
    return (
    <div
        className="
            h-full
            grid
            grid-cols-1
            md:grid-cols-[320px_1fr]
            lg:grid-cols-[240px_320px_1fr]"
    >

        <aside className="hidden lg:block border-r">
            <FoldersArea></FoldersArea>
        </aside>


        <aside className="hidden md:block border-r">
            Notas
        </aside>

        <main className="overflow-auto">
            Conteúdo da nota
        </main>
    </div>
    )
}