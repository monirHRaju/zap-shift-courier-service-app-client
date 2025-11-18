import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/shared/footer/Footer';
import Navbar from '../pages/shared/navbar/Navbar';

const RootLayouts = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayouts;