import React from 'react';
import { Link, Outlet } from 'react-router';
import Logo from '../components/logo/Logo';
const AuthLayouts = () => {
    
    return (
        <div className='max-w-7xl mx-auto'>
            <div>
                <Link to={'/'}><Logo></Logo></Link>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayouts;