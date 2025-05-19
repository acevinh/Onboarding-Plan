// utils/useAuth.js
export const useAuth = () => {
    const token = localStorage.getItem("auth_token");
    const user = JSON.parse(localStorage.getItem("user_data"));
    
    const checkTokenExpiry = () => {
        const expiry = localStorage.getItem("token_expiry");
        if (expiry) {
            return new Date().getTime() < parseInt(expiry);
        }
        return !!token;
    };
    
    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        localStorage.removeItem('token_expiry');
        // Optional: Add API call to invalidate token on server
    };
    
    return {
        isAuthenticated: !!token && checkTokenExpiry(),
        user,
        token,
        logout 
    };
};