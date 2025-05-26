import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";
import { toast } from "sonner";

const Header = React.memo(() => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();

    const handleLogout = async () => {
        const toastId = toast.loading('Logging out...');
        try {
            const response = await fetch("http://cmsremake.test/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('auth_token')}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Logout failed');
            }

            logout();
            toast.success('Logged out successfully', { id: toastId });
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.message || 'Logout failed', { id: toastId });
            logout();
            navigate('/login');
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-base-200 bg-base-100/80 backdrop-blur-sm">
            <div className="container mx-auto px-4">
                <div className="navbar">
                    {/* Logo/Brand */}
                    <div className="flex-1">
                        <a 
                            className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                            onClick={() => navigate('/')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            CMS Pro
                        </a>
                    </div>

                    {/* Navigation Links */}
                    {isAuthenticated && (
                        <div className="hidden md:flex gap-1">
                            <button 
                                className="btn btn-ghost btn-sm rounded-btn hover:bg-base-200"
                                onClick={() => navigate('/dashboard')}
                            >
                                Dashboard
                            </button>
                            <button 
                                className="btn btn-ghost btn-sm rounded-btn hover:bg-base-200"
                                onClick={() => navigate('/users')}
                            >
                                Users
                            </button>
                            <button 
                                className="btn btn-ghost btn-sm rounded-btn hover:bg-base-200"
                                onClick={() => navigate('/settings')}
                            >
                                Settings
                            </button>
                        </div>
                    )}

                    {/* User Section */}
                    <div className="flex-none gap-4">
                        {isAuthenticated ? (
                            <div className="dropdown dropdown-end">
                                <div className="flex items-center gap-2">
                                    <div className="hidden sm:block text-right">
                                        <p className="font-medium text-sm">{user?.name || 'User'}</p>
                                        <p className="text-xs opacity-70">{user?.email || ''}</p>
                                    </div>
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn btn-ghost btn-circle avatar hover:ring-2 hover:ring-primary hover:ring-offset-2"
                                    >
                                        <div className="w-10 rounded-full bg-primary text-primary-content">
                                            {user?.name ? (
                                                <span className="text-lg font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            ) : (
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-52 mt-4 border border-base-200"
                                >
                                    <li>
                                        <button onClick={() => navigate('/profile')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => navigate('/settings')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                            </svg>
                                            Settings
                                        </button>
                                    </li>
                                    <div className="divider my-0"></div>
                                    <li>
                                        <button 
                                            onClick={handleLogout}
                                            className="text-error hover:bg-error hover:text-error-content"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                                            </svg>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button 
                                    className="btn btn-ghost"
                                    onClick={() => navigate('/login')}
                                >
                                    Login
                                </button>
                                <button 
                                    className="btn btn-primary btn-outline"
                                    onClick={() => navigate('/register')}
                                >
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
});

export default Header;