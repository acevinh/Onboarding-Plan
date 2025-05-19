// utils/ProtectedRoutes.jsx
import { useAuth } from './useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        // Lưu URL hiện tại để redirect lại sau khi login
        localStorage.setItem('redirect_path', window.location.pathname);
        return <Navigate to="/login" replace />;
    }
    
    return <Outlet />;
};

export default ProtectedRoutes;