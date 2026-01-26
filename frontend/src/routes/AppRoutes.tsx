import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { PrivateRoute } from "./PrivateRoute";
import { Register } from "../pages/Register";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Profile } from "../pages/Profile";
import { AppLayout } from "../layouts/AppLayouts/AppLayout";
import { NotFound } from "../pages/NotFound";
import { PublicRoute } from "./PublicRoute";
import { AccountSettings } from "../pages/AccountSettings";


export const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<PublicRoute/>}>
                <Route path="/" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Route>
            {/* PRIVATE ROUTES */}
            <Route element={<PrivateRoute/>}>
                <Route element={<AppLayout/>}>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/dashboard' element={<Dashboard/>}/>
                    <Route path='/edit' element={<AccountSettings/>}/>
                </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
