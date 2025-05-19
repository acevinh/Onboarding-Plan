// utils/PublicRoute.jsx
import { useAuth } from './useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const { isAuthenticated } = useAuth();
    
    if (isAuthenticated) {
        const redirectPath = localStorage.getItem('redirect_path') || '/dashboard';
        localStorage.removeItem('redirect_path');
        return <Navigate to={redirectPath} replace />;
    }
    
    return <Outlet />;
};

export default PublicRoutes;