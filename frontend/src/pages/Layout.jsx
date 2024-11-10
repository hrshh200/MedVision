import React from 'react';
import { Outlet } from 'react-router-dom';

//commponents
import Navbar from '../components/Navbar';

const Layout = () => {
    return (
        <div>
            <Navbar/>
            <Outlet />
        </div>
    )
}

export default Layout
