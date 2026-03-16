import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({allowedRole, children }) {

    const token = localStorage.getItem("token");
    const role =localStorage.getItem("role");
    if(!token){
        return <Navigate to="/"/>
    }
    if(role !== allowedRole){
        return <Navigate to="/unauthorized" />;
    }
    
    return children;
}

export default ProtectedRoute;