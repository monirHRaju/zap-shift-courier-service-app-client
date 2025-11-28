import React from 'react';
import Loading from '../pages/Loading/Loading';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({children}) => {
    const { user, loading} = useAuth()
    const location = useLocation()
    // console.log('location', location)
    if(loading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate state={location.pathname} to={'/login'}></Navigate>
    }

    return children;
};

export default PrivateRoute;