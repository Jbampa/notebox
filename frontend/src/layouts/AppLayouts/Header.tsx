

export default function Header() {
    return (
        <header className="flex items-center bg-gray-200 h-12 justify-between pr-2 pl-2">
            <div>Titulo aqui</div>
            <div className="flex flex-row gap-1.5">
                <div>Ir para caixas</div>
                <div>Foto perfil</div>
            </div>
        </header>
    )
}