import { Outlet } from "react-router-dom"
import Header  from "./Header"

export const AppLayout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header></Header>
            <main className="flex-1 overflow-auto">
                <Outlet></Outlet>
            </main>
        </div>
    );
}