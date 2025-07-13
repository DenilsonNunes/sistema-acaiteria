// src/routes/PrivateRoute.tsx
import { AuthContext } from '@/contexts/AuthContext';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


export function PrivateRoute() {

  const { isAuthenticated, isLoading } = useContext(AuthContext);


  if(isLoading){
    return <></>
  }

  return isAuthenticated ? <Outlet/> : <Navigate to="/auth/login" replace/>;

}
