import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../share/Navbar';
import Footer from '../../share/Footer';
import './MainLayout.css';

const MainLayout = () => {
    return (
        <div className="main-layout-container">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
};

export default MainLayout;