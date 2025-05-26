import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../utils/useAuth";
import { toast } from "sonner";

function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { user, logout } = useAuth();

    const menuItems = [
        { path: "/dashboard", icon: "pie-chart-outline", label: "Dashboard" },
        { path: "/store-list", icon: "storefront-outline", label: "Stores" },
        { path: "/user", icon: "people-outline", label: "Users" },
        { path: "/role-list", icon: "shield-half-outline", label: "Roles" },
        { path: "/permission-list", icon: "key-outline", label: "Permissions" },
    ];

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
        <div
            className="flex h-screen bg-base-100 font-sans overflow-hidden"
            data-theme="winter"
        >
            {/* Sidebar cố định chiều cao màn hình */}
            <div
                className={`bg-base-200 border-r border-base-300/20 flex flex-col transition-all duration-100 h-screen fixed ${
                    sidebarOpen ? "w-64" : "w-20"
                }`}
            >
                {/* Brand Area */}
                <div className="p-3 border-b border-base-300/10 flex items-center justify-between min-h-[64px]">
                    {sidebarOpen ? (
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/90 flex items-center justify-center shadow-lg">
                                <ion-icon
                                    name="options-outline"
                                    className="text-xl text-primary-content"
                                ></ion-icon>
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-primary/90">
                                Dashboard
                            </h2>
                        </div>
                    ) : null}

                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className={`btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-primary ${
                            sidebarOpen ? "" : "mx-auto"
                        }`}
                    >
                        <ion-icon
                            name={
                                sidebarOpen ? "chevron-back" : "chevron-forward"
                            }
                        ></ion-icon>
                    </button>
                </div>

                {/* Navigation - sử dụng flex-1 để chiếm không gian còn lại */}
                <div className="flex-1 overflow-y-auto p-2">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 p-3 rounded-lg group relative ${
                                        location.pathname === item.path
                                            ? "bg-primary/10 text-primary"
                                            : "hover:bg-base-300/10 text-base-content/80 hover:text-base-content"
                                    } ${
                                        sidebarOpen
                                            ? "justify-start"
                                            : "justify-center"
                                    }`}
                                    title={!sidebarOpen ? item.label : ""}
                                >
                                    <div
                                        className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                            location.pathname === item.path
                                                ? "bg-primary/10 text-primary"
                                                : "bg-base-300/10 text-base-content/60 group-hover:bg-primary/5 group-hover:text-primary"
                                        }`}
                                    >
                                        <ion-icon
                                            name={item.icon}
                                            className="text-lg"
                                        ></ion-icon>
                                    </div>

                                    {sidebarOpen && (
                                        <>
                                            <span className="font-medium whitespace-nowrap">
                                                {item.label}
                                            </span>
                                            {location.pathname ===
                                                item.path && (
                                                <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>
                                            )}
                                        </>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Profile - luôn ở dưới cùng */}
                <div className="p-3 border-t border-base-300/10">
                    {sidebarOpen ? (
                        // Sidebar mở rộng - hiển thị đầy đủ thông tin user
                        <div className="dropdown dropdown-top">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center gap-3 p-2 rounded-xl hover:bg-base-300/10 w-full cursor-pointer"
                            >
                                <div className="avatar">
                                    <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                        {user?.name ? (
                                            <span className="text-lg font-bold">
                                                {user.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </span>
                                        ) : (
                                            <ion-icon
                                                name="person-circle-outline"
                                                className="text-xl"
                                            ></ion-icon>
                                        )}
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium truncate text-base-content">
                                        {user?.name || "User"}
                                    </p>
                                    <p className="text-xs text-base-content/50 truncate">
                                        {user?.email || ""}
                                    </p>
                                </div>
                                <ion-icon 
                                    name="chevron-up-outline" 
                                    className="text-base-content/50 text-sm"
                                ></ion-icon>
                            </div>
                            <div
                                tabIndex={0}
                                className="dropdown-content z-[1] shadow bg-base-100 rounded-box w-52 mb-2 border border-base-300/20 p-2"
                            >
                                <Link 
                                    to="/profile" 
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300/10 text-base-content"
                                >
                                    <ion-icon name="person-outline" className="text-lg"></ion-icon>
                                    <span>Profile</span>
                                </Link>
                                <Link 
                                    to="/settings" 
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300/10 text-base-content"
                                >
                                    <ion-icon name="settings-outline" className="text-lg"></ion-icon>
                                    <span>Settings</span>
                                </Link>
                                <div className="divider my-1"></div>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-error hover:text-error-content text-error w-full text-left"
                                >
                                    <ion-icon name="log-out-outline" className="text-lg"></ion-icon>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        // // Sidebar thu gọn - chỉ hiển thị avatar
                        <div className="flex justify-center">
                            <div className="dropdown dropdown-top">
                               <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center btn btn-ghost btn-circle hover:ring-2 ring-primary ring-offset-2"
                            >
                                    <div className="avatar">
                                        <div className="w-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
                                            {user?.name ? (
                                                <span className="text-lg font-bold">
                                                    {user.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            ) : (
                                                <ion-icon
                                                    name="person-circle-outline"
                                                    className="text-xl"
                                                ></ion-icon>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div
                                    tabIndex={0}
                                    className="dropdown-content z-[1] bg-none rounded-box mb-2 border border-base-300/20 p-1"
                                >
                                    {/* Header với thông tin user */}

                                    <Link 
                                        to="/profile" 
                                        className="flex items-center gap-3 p-3 rounded-box hover:bg-base-300/10 text-base-content"
                                    >
                                        <ion-icon name="person-outline" className="text-lg"></ion-icon>
                                    </Link>
                                    <Link 
                                        to="/settings" 
                                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300/10 text-base-content"
                                    >
                                        <ion-icon name="settings-outline" className="text-lg"></ion-icon>
                                    </Link>
                                    <div className="divider my-1"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 p-3 rounded-box hover:bg-error hover:text-error-content text-error w-full text-left"
                                    >
                                        <ion-icon name="log-out-outline" className="text-lg"></ion-icon>
                                       
                                    </button>
                                </div>
                            </div>
                        </div>
                     
                    )}
                </div>
            </div>

            {/* Main Content Area - thêm margin-left bằng với width của sidebar */}
            <div
                className={`flex-1 overflow-y-auto bg-base-100/50 ml-${
                    sidebarOpen ? "64" : "20"
                } transition-all duration-100`}
                style={{ height: "100vh" }}
            >
                <div className="p-6 h-full">
                    <div className="bg-base-100 rounded-2xl shadow-xs border border-base-300/10 p-6 h-full">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;