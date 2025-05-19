import { Link, Outlet, useLocation } from "react-router-dom";   
import { useState } from "react";

function DashboardLayout() {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const menuItems = [
        { path: "/dashboard", icon: "pie-chart-outline", label: "Dashboard" },
        { path: "/store-list", icon: "storefront-outline", label: "Stores" },
        { path: "/user", icon: "people-outline", label: "Users" },
        { path: "/role-list", icon: "shield-half-outline", label: "Roles" },
        { path: "/permission-list", icon: "key-outline", label: "Permissions" }
    ];

    return (
        <div className="flex min-h-screen bg-base-100 font-sans" data-theme="winter">
            {/* Sidebar */}
            <div 
                className={`bg-base-200 border-r border-base-300/20 flex flex-col transition-all duration-100 ${
                    sidebarOpen ? "w-64" : "w-20"
                }`}
            >
                {/* Brand Area */}
                <div className="p-3 border-b border-base-300/10 flex items-center justify-between min-h-[64px]">
    {/* Brand Area - Ẩn hoàn toàn khi sidebar thu gọn */}
    {sidebarOpen ? (
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/90 flex items-center justify-center shadow-lg">
                <ion-icon name="options-outline" className="text-xl text-primary-content"></ion-icon>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-primary/90">
                Dasboard 
                {/* <span className="text-base-content">Luxe</span> */}
            </h2>
        </div>
    ) : (
        <div className="w-0 opacity-0 overflow-hidden"></div> 
    )}
    
    {/* Nút toggle - luôn hiển thị và căn giữa khi sidebar thu gọn */}
    <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`btn btn-ghost btn-circle btn-sm text-base-content/50 hover:text-primary ${
            sidebarOpen ? "" : "mx-auto"
        }`}
    >
        <ion-icon name={sidebarOpen ? "chevron-back" : "chevron-forward"}></ion-icon>
    </button>
</div>
                
                {/* Navigation */}
                <div className="flex-1 p-2 overflow-y-auto">
                    <ul className="space-y-1">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 p-3 rounded-lg group relative ${
                                        location.pathname === item.path 
                                            ? 'bg-primary/10 text-primary'
                                            : 'hover:bg-base-300/10 text-base-content/80 hover:text-base-content'
                                    } ${
                                        sidebarOpen ? "justify-start" : "justify-center"
                                    }`}
                                    title={!sidebarOpen ? item.label : ""}
                                >
                                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                                        location.pathname === item.path 
                                            ? 'bg-primary/10 text-primary'
                                            : 'bg-base-300/10 text-base-content/60 group-hover:bg-primary/5 group-hover:text-primary'
                                    }`}>
                                        <ion-icon name={item.icon} className="text-lg"></ion-icon>
                                    </div>
                                    
                                    {sidebarOpen && (
                                        <>
                                            <span className="font-medium whitespace-nowrap">
                                                {item.label}
                                            </span>
                                            {location.pathname === item.path && (
                                                <div className="ml-auto h-2 w-2 rounded-full bg-primary"></div>
                                            )}
                                        </>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Profile */}
                {/* <div className="p-2 border-t border-base-300/10">
                    <div className={`flex items-center gap-3 p-2 rounded-xl bg-base-300/5 hover:bg-base-300/10 cursor-pointer ${
                        sidebarOpen ? "" : "justify-center"
                    }`}>
                        <div className="avatar">
                            <div className="w-10 rounded-full bg-primary/90 flex items-center justify-center text-primary-content">
                                <ion-icon name="person-circle-outline" className="text-xl"></ion-icon>
                            </div>
                        </div>
                        {sidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate text-base-content">Admin User</p>
                                <p className="text-xs text-base-content/50 truncate">Super Admin</p>
                            </div>
                        )}
                    </div>
                </div> */}
            </div>
            
            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto bg-base-100/50">
                {/* Sticky Header */}
                {/* <div className="sticky top-0 z-10 bg-base-100/80 backdrop-blur-lg border-b border-base-300/10 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="btn btn-ghost btn-circle btn-sm lg:hidden"
                        >
                            <ion-icon name="menu-outline"></ion-icon>
                        </button>
                        <h1 className="text-2xl font-semibold text-base-content">
                            {menuItems.find(item => item.path === location.pathname)?.label || 'Dashboard'}
                        </h1>
                        <span className="badge badge-sm badge-primary/10 text-primary/80 border border-primary/20">
                            v3.2.1
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-primary relative">
                            <ion-icon name="notifications-outline" className="text-xl"></ion-icon>
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-error"></span>
                        </button>
                        
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-primary">
                            <ion-icon name="settings-outline" className="text-xl"></ion-icon>
                        </button>
                        
                        <div className="w-px h-6 bg-base-300/30 mx-1"></div>
                        
                        <button className="btn btn-ghost btn-circle btn-sm text-base-content/60 hover:text-primary">
                            <ion-icon name="help-circle-outline" className="text-xl"></ion-icon>
                        </button>
                    </div>
                </div> */}
                
                {/* Content Container */}
                <div className="p-6">
                    <div className="bg-base-100 rounded-2xl shadow-xs border border-base-300/10 p-6" data-theme='bumblebee'>
                        <Outlet />
                    </div>
                    
                    {/* Footer */}
                    {/* <div className="mt-6 text-center text-xs text-base-content/50">
                        <p>© {new Date().getFullYear()} AdminLuxe Pro | Designed with <ion-icon name="heart" className="text-error/60"></ion-icon> by Design Team</p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;