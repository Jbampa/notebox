import { useAuth } from "../contexts/AuthContext"
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = () => {
    const {isAuthenticated, loading} = useAuth();

    if(loading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet/> : <Navigate to="/" replace/>
}