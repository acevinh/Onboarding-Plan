import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/useAuth";

const Header = React.memo(() => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout } = useAuth();
// console.log(user);

    const handleLogout = async () => {
        try {
            // Call API logout endpoint to invalidate token
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

            // Clear local storage and auth state
            logout();
            
            // Redirect to login page
            navigate('/login');
            
        } catch (error) {
            console.error("Logout error:", error);
            // Fallback: clear local storage even if API call fails
            logout();
            navigate('/login');
        }
    };

    return (
        <header>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Cms</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        {isAuthenticated ? (
                            <>
                                <div
                                    tabIndex="0"
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-10 rounded-full">
                                        <img
                                            alt="User Avatar"
                                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        />
                                    </div>
                                </div>
                                <ul
                                    tabIndex="0"
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                                >
                                    <li>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left"
                                        >
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            </>
                        ) : (
                            <button 
                                className="btn btn-primary"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
});

export default Header;