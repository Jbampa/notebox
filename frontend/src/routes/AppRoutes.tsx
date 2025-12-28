import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/Dashboard";
import { Profile } from "../pages/Profile";
import { AppLayout } from "../layouts/AppLayouts/AppLayout";


export const AppRoutes = () => {
    return (
        <Routes>
            {/* PUBLIC ROUTES */}
            <Route path="/" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>

            {/* PRIVATE ROUTES */}
            <Route element={<PrivateRoute/>}>
                <Route element={<AppLayout/>}>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                </Route>
            </Route>
        </Routes>
    )
}
