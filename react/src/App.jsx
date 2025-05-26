import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import PublicRoutes from "./utils/PublicRoute";
import Login from "./views/auth/login";
import Register from "./views/auth/register";
import ForgotPass from "./views/auth/forgot_password";
import DashboardLayout from "./views/DashboardLayout";
import DashBoardView from "./views/dashboard";
import StoreIndex from "./views/dashboard/store/index";
import StoreDetails from "./views/dashboard/store/detail"; 
import CreateDiscount from "./views/dashboard/discount/create";

import NotFound from "./views/NotFound"; 
// import { useAuth } from "./utils/useAuth"; 
import { Navigate } from "react-router-dom"; 
import UserIndex from "./views/dashboard/user";
import RoleIndex from "./views/dashboard/role";
import PermissionIndex from "./views/dashboard/permission";
import EditDiscount from "./views/dashboard/discount/edit";
import UserEdit from "./views/dashboard/user/edit";
import CreateRole from "./views/dashboard/role/create";
import EditRole from "./views/dashboard/role/edit";
import PermissionCreate from "./views/dashboard/permission/create";
import PermissionEdit from "./views/dashboard/permission/edit";
import { Toaster } from 'sonner'

function App() {
    // const isAuthenticated = useAuth(); 

    return (
        <BrowserRouter>
          <Toaster 
                position="top-right"
                richColors
                closeButton
                expand={true}
                duration={5000}
            />
            {/* <Header /> */}
            <Routes>
               <Route path="/" element={
                    <Navigate to={localStorage.getItem('auth_token') ? '/dashboard' : '/login'} replace />
                } />

                <Route element={<PublicRoutes />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPass />} />
                </Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<DashboardLayout />}>
                        <Route element={<DashBoardView />} path="/dashboard" />
                        <Route element={<StoreIndex />} path="/store-list" />
                        <Route element={<StoreDetails />} path="/store-list/:id" /> 
                        <Route element={<CreateDiscount />} path="/discounts/create/:storeId" /> 
                        <Route element={<EditDiscount />} path="/discounts/edit/:discountId" /> 
                        <Route element={<UserIndex />} path="/user" />
                        <Route element={<UserEdit />} path="/user/edit/:userId" />
                        <Route element={<RoleIndex />} path="/role-list" />
                        <Route element={<CreateRole />} path="role/create" />
                        <Route element={<EditRole />} path="role/edit/:roleId" />
                        <Route element={<PermissionIndex />} path="/permission-list" />
                        <Route element={<PermissionCreate />} path="/permission/create" />
                        <Route element={<PermissionEdit />} path="/permission/edit/:psId" />
                    </Route>
                </Route>
              
                <Route path="*" element={<NotFound />} /> 
            </Routes>
        </BrowserRouter>
    );
}

export default App;