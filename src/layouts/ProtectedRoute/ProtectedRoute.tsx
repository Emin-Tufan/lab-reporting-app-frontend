import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import { useAuth } from '../../Auth/UseAuth';
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
    allowedRoles: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { token } = useAuth();
    const decodedToken: string[] = token ? jwtDecode(token) : [];
    const authorities: string[] = (decodedToken as any)?.authorities;

    if (authorities && authorities.includes(allowedRoles)) {
        return <Outlet />;
    } else {
        return <Navigate to="/unauthorized" />;
    }
};

export default ProtectedRoute;
