// src/routes/PrivateRoute.tsx
import { Navigate, Outlet } from 'react-router-dom';


export function PrivateRoute() {

  const isAuthenticated = true
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

}
